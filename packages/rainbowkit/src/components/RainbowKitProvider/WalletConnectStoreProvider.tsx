import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useConfig, useConnect } from 'wagmi';
import {
  WalletConnectStore,
  createWalletConnectStore,
} from '../../core/walletConnect/walletConnectStore';
import {
  getWalletConnectWallet,
  getWalletsFromConnectors,
} from '../../utils/wallets';

const WalletConnectStoreContext = createContext<WalletConnectStore>(
  createWalletConnectStore(),
);

interface WalletConnectStoreProviderProps {
  children: ReactNode;
}

let walletConnectStoreSingleton: WalletConnectStore;

export function WalletConnectStoreProvider({
  children,
}: WalletConnectStoreProviderProps) {
  const config = useConfig();
  const { connectors } = useConnect();

  // Use existing WalletConnect store if it exists, or lazily create one
  const [walletConnectStore] = useState(
    () =>
      walletConnectStoreSingleton ??
      (walletConnectStoreSingleton = createWalletConnectStore()),
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: prevent new reference on every re-render
  const wallets = useMemo(() => getWalletsFromConnectors({ connectors }), []);

  const walletConnectModalConnector = useMemo(
    () =>
      getWalletConnectWallet({
        walletId: 'walletConnect',
        wallets,
      })?.walletConnectModalConnector,
    [wallets],
  );

  // Preload WalletConnect modal
  useEffect(() => {
    if (walletConnectModalConnector) {
      walletConnectStore.createWalletConnectModalConnector({
        config,
        createConnector: walletConnectModalConnector,
      });
    }
  }, [walletConnectStore, config, walletConnectModalConnector]);

  return (
    <WalletConnectStoreContext.Provider value={walletConnectStore}>
      {children}
    </WalletConnectStoreContext.Provider>
  );
}

export function useWalletConnectStore(): WalletConnectStore {
  return useContext(WalletConnectStoreContext);
}
