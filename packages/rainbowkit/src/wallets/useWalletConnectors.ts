import { Connector, useConnect } from 'wagmi';
import { flatten } from '../utils/flatten';
import { indexBy } from '../utils/indexBy';
import { isNotNullish } from '../utils/isNotNullish';
import { useRainbowKitChains } from './../components/RainbowKitProvider/RainbowKitChainContext';
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
  const chains = useRainbowKitChains();
  const { connectAsync, connectors: defaultConnectors } = useConnect({
    chainId: chains[0]?.id,
  });

  async function connectWallet(walletId: string, connector: Connector) {
    const result = await connectAsync({ connector });

    if (result) {
      addRecentWalletId(walletId);
    }

    return result;
  }

  const walletInstances = flatten(
    defaultConnectors.map(connector => {
      // @ts-expect-error
      return (connector._wallets as WalletInstance[]) ?? [];
    })
  ).sort((a, b) => a.index - b.index);

  const walletInstanceById = indexBy(
    walletInstances,
    walletInstance => walletInstance.id
  );

  const MAX_RECENT_WALLETS = 3;
  const recentWallets: WalletInstance[] = getRecentWalletIds()
    .map(walletId => walletInstanceById[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS);

  const groupedWallets: WalletInstance[] = [
    ...recentWallets,
    ...walletInstances.filter(
      walletInstance => !recentWallets.includes(walletInstance)
    ),
  ];

  const walletConnectors: WalletConnector[] = [];

  groupedWallets.forEach((wallet: WalletInstance) => {
    if (!wallet) {
      return;
    }

    const recent = recentWallets.includes(wallet);

    walletConnectors.push({
      ...wallet,
      connect: () => connectWallet(wallet.id, wallet.connector),
      groupName: recent ? 'Recent' : wallet.groupName,
      onConnecting: (fn: () => void) =>
        wallet.connector.on('message', ({ type }) =>
          type === 'connecting' ? fn() : undefined
        ),
      ready: (wallet.installed ?? true) && wallet.connector.ready,
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
    });
  });

  return walletConnectors;
}
