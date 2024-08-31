import { useEffect, useMemo } from 'react';
import { useConfig, useConnect } from 'wagmi';
import {
  useInitialChainId,
  useRainbowKitChains,
} from '../components/RainbowKitProvider/RainbowKitChainContext';
import { useWalletConnectStore } from '../components/RainbowKitProvider/WalletConnectStoreProvider';
import {
  getWalletConnectWallet,
  getWalletsFromConnectors,
} from '../utils/wallets';

export function useRequestWalletConnectUri() {
  const { requestWalletConnectUri: requestWalletConnectUriStore } =
    useWalletConnectStore();

  const config = useConfig();
  const rainbowKitChains = useRainbowKitChains();
  const initialChainId = useInitialChainId();

  const { connectAsync, connectors } = useConnect();

  // biome-ignore lint/correctness/useExhaustiveDependencies: prevent new reference on every re-render
  const wallets = useMemo(() => getWalletsFromConnectors({ connectors }), []);

  const walletConnectWallet = useMemo(
    () =>
      getWalletConnectWallet({
        wallets,
      }),
    [wallets],
  );

  useEffect(() => {
    if (walletConnectWallet) {
      requestWalletConnectUriStore({
        config,
        walletConnectWallet,
        chainId: initialChainId,
        chains: rainbowKitChains,
        connectAsync,
      });
    }
  }, [
    config,
    walletConnectWallet,
    initialChainId,
    rainbowKitChains,
    requestWalletConnectUriStore,
    connectAsync,
  ]);
}
