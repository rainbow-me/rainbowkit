import { useEffect, useState } from 'react';
import { Connector, useConnect } from 'wagmi';
import { flatten } from '../utils/flatten';
import { indexBy } from '../utils/indexBy';
import { isNotNullish } from '../utils/isNotNullish';
import {
  useInitialChainId,
  useRainbowKitChains,
} from './../components/RainbowKitProvider/RainbowKitChainContext';
import { WalletInstance } from './Wallet';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connect?: ReturnType<typeof useConnect>['connectAsync'];
  onConnecting?: (fn: () => void) => void;
  showWalletConnectModal?: () => void;
  recent: boolean;
}

const assembleWalletConnectors = async ({
  connectAsync,
  defaultConnectors,
  intialChainId,
  rainbowKitChains,
}: {
  connectAsync: ReturnType<typeof useConnect>['connectAsync'];
  defaultConnectors: Connector[];
  intialChainId: number | undefined;
  rainbowKitChains: ReturnType<typeof useRainbowKitChains>;
}): Promise<WalletConnector[]> => {
  async function connectWallet(walletId: string, connector: Connector) {
    const walletChainId = await connector.getChainId();
    const result = await connectAsync({
      chainId:
        // The goal here is to ensure users are always on a supported chain when connecting.
        // If an `initialChain` prop was provided to RainbowKitProvider, use that.
        intialChainId ??
        // Otherwise, if the wallet is already on a supported chain, use that to avoid a chain switch prompt.
        rainbowKitChains.find(({ id }) => id === walletChainId)?.id ??
        // Finally, fall back to the first chain provided to RainbowKitProvider.
        rainbowKitChains[0]?.id,
      connector,
    });

    if (result) {
      addRecentWalletId(walletId);
    }

    return result;
  }

  const _walletInstances = flatten(
    defaultConnectors.map(connector => {
      return (connector._wallets as WalletInstance[]) ?? [];
    })
  ).sort((a, b) => a.index - b.index);

  const walletInstances = _walletInstances.filter(
    walletInstance =>
      walletInstance.hidden?.({ wallets: _walletInstances }) !== true
  );

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
      walletInstance =>
        !recentWallets.includes(walletInstance) &&
        !walletInstance.hidden?.({ wallets: walletInstances })
    ),
  ];

  const walletConnectors: WalletConnector[] = [];

  for (const wallet of groupedWallets) {
    if (!wallet) {
      break;
    }

    const recent = recentWallets.includes(wallet);

    walletConnectors.push({
      ...wallet,
      connect: () => connectWallet(wallet.id, wallet.connector),
      groupName: wallet.groupName,
      onConnecting: (fn: () => void) =>
        wallet.connector.on('message', ({ type }: { type: string }) =>
          type === 'connecting' ? fn() : undefined
        ),
      ready:
        ((typeof wallet.installed === 'function'
          ? wallet.installed?.()
          : wallet.installed) ??
          true) &&
        (wallet.connector.ready || (await wallet.connector.getProvider())),
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
  }
  return walletConnectors;
};

export function useWalletConnectors(): WalletConnector[] {
  const rainbowKitChains = useRainbowKitChains();
  const intialChainId = useInitialChainId();
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect();
  const defaultConnectors = defaultConnectors_untyped as Connector[];

  const [walletConnectors, setWalletConnectors] = useState<WalletConnector[]>(
    []
  );

  useEffect(() => {
    const fetchWalletConnectors = async () => {
      const _walletConnectors = await assembleWalletConnectors({
        connectAsync,
        defaultConnectors,
        intialChainId,
        rainbowKitChains,
      });
      setWalletConnectors(_walletConnectors);
    };
    fetchWalletConnectors();
  }, [connectAsync, defaultConnectors, intialChainId, rainbowKitChains]);

  return walletConnectors;
}
