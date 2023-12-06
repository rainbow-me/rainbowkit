import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { PublicClient } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';
import { useShowTransactions } from '../components/RainbowKitProvider/ResponsiveRpcSettingsProvider';
import { useChainId } from '../hooks/useChainId';
import { TransactionStore, createTransactionStore } from './transactionStore';

// Only allow a single instance of the store to exist at once
// so that multiple RainbowKitProvider instances can share the same store.
// We delay the creation of the store until the first time it is used
// so that it always has access to a provider.
let storeSingleton: ReturnType<typeof createTransactionStore> | undefined;

const TransactionStoreContext = createContext<TransactionStore | null>(null);

export function TransactionStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const provider = usePublicClient() as PublicClient;
  const { address } = useAccount();
  const showTransactions = useShowTransactions();
  const chainId = useChainId();

  // Use existing store if it exists, or lazily create one
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const store = useMemo(() => {
    return showTransactions
      ? storeSingleton ??
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          (storeSingleton = createTransactionStore({ provider }))
      : undefined;
  }, [showTransactions]);

  // Keep store provider up to date with any wagmi changes
  useEffect(() => {
    if (store && provider) {
      store.setProvider(provider);
    }
  }, [store, provider]);

  // Wait for pending transactions whenever address or chainId changes
  useEffect(() => {
    if (address && chainId && store) {
      store.waitForPendingTransactions(address, chainId);
    }
  }, [store, address, chainId]);

  return (
    <TransactionStoreContext.Provider value={store || null}>
      {children}
    </TransactionStoreContext.Provider>
  );
}

export function useTransactionStore() {
  const store = useContext(TransactionStoreContext);
  return store;
}
