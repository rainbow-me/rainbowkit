import { Connector, useConnect } from 'wagmi';
import { indexBy } from '../utils/indexBy';
import { isNotNullish } from '../utils/isNotNullish';
import { WalletInstance } from './Wallet';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connect?: () => Promise<{
    data?: any;
    error?: Error | undefined;
  }>;
  showWalletConnectModal?: () => void;
  recent: boolean;
}

export function useWalletConnectors(): WalletConnector[] {
  const [{ data: connectData }, connect] = useConnect();

  async function connectWallet(walletId: string, connector: Connector) {
    const result = await connect(connector);

    if (result.data) {
      addRecentWalletId(walletId);
    }

    return result;
  }

  const connectorByWalletId = indexBy(
    connectData.connectors,
    connector => (connector._wallet as WalletInstance)?.id
  );

  const MAX_RECENT_WALLETS = 3;
  const recentConnectors: Connector[] = getRecentWalletIds()
    .map(walletId => connectorByWalletId[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS);

  const connectors: Connector[] = [
    ...recentConnectors,
    ...connectData.connectors.filter(
      connector => !recentConnectors.includes(connector)
    ),
  ];

  return connectors
    .map((connector: Connector) => {
      const wallet = connector._wallet as WalletInstance;

      if (!wallet) {
        return null;
      }

      const recent = recentConnectors.includes(connector);

      return {
        ...wallet,
        connect: () => connectWallet(wallet.id, connector),
        groupName: recent ? 'Recent' : wallet.groupName,
        ready: (wallet.installed ?? true) && connector.ready,
        recent,
        showWalletConnectModal: wallet.walletConnectModalConnector
          ? () => connectWallet(wallet.id, wallet.walletConnectModalConnector)
          : undefined,
      };
    })
    .filter(isNotNullish);
}
