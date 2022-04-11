import { useEffect, useState } from 'react';
import { useAddress } from '../hooks/useAddress';
import { useChainId } from '../hooks/useChainId';
import { useTransactionStore } from './TransactionStoreContext';
import type { Transaction } from './transactionStore';

export function useRecentTransactions(): Transaction[] {
  const store = useTransactionStore();
  const address = useAddress();
  const chainId = useChainId();

  const [transactions, setTransactions] = useState(() =>
    store && address && chainId ? store.getTransactions(address, chainId) : []
  );

  useEffect(() => {
    return store.onChange(() => {
      if (!address || !chainId) {
        return;
      }

      setTransactions(store.getTransactions(address, chainId));
    });
  }, [store, address, chainId]);

  return transactions;
}
