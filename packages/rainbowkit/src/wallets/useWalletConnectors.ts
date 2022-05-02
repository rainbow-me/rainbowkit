import { Connector, useConnect } from 'wagmi';
import { indexBy } from '../utils/indexBy';
import { isNotNullish } from '../utils/isNotNullish';
import { WalletInstance } from './Wallet';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connect?: ReturnType<typeof useConnect>['connectAsync'];
  onConnecting?: (fn: () => void) => void;
  showWalletConnectModal?: () => void;
  recent: boolean;
}

export function useWalletConnectors(): WalletConnector[] {
  const { connectAsync, connectors: defaultConnectors } = useConnect();

  async function connectWallet(walletId: string, connector: Connector) {
    const result = await connectAsync(connector);

    if (result) {
      addRecentWalletId(walletId);
    }

    return result;
  }

  const connectorByWalletId = indexBy(
    defaultConnectors,
    // @ts-expect-error
    connector => (connector._wallet as WalletInstance)?.id
  );

  const MAX_RECENT_WALLETS = 3;
  const recentConnectors: Connector[] = getRecentWalletIds()
    .map(walletId => connectorByWalletId[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS);

  const connectors: Connector[] = [
    ...recentConnectors,
    ...defaultConnectors.filter(
      connector => !recentConnectors.includes(connector)
    ),
  ];

  return connectors
    .map((connector: Connector) => {
      // @ts-expect-error
      const wallet = connector._wallet as WalletInstance;

      if (!wallet) {
        return null;
      }

      const recent = recentConnectors.includes(connector);

      return {
        ...wallet,
        connect: () => connectWallet(wallet.id, connector),
        groupName: recent ? 'Recent' : wallet.groupName,
        onConnecting: (fn: () => void) =>
          connector.on('message', ({ type }) =>
            type === 'connecting' ? fn() : undefined
          ),
        ready: (wallet.installed ?? true) && connector.ready,
        recent,
        showWalletConnectModal: wallet.walletConnectModalConnector
          ? async () => {
              try {
                await connectWallet(
                  wallet.id,
                  wallet.walletConnectModalConnector!
                );
              } catch (err) {
                // @ts-expect-error
                const isUserRejection = err.name === 'UserRejectedRequestError';

                if (!isUserRejection) {
                  throw err;
                }
              }
            }
          : undefined,
      };
    })
    .filter(isNotNullish);
}
