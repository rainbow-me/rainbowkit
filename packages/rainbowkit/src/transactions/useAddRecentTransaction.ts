import { useCallback } from 'react';
import { useAddress } from '../hooks/useAddress';
import { useChainId } from '../hooks/useChainId';
import { useTransactionStore } from './TransactionStoreContext';
import { NewTransaction } from './transactionStore';

export function useAddRecentTransaction(): (
  transaction: NewTransaction
) => void {
  const store = useTransactionStore();
  const address = useAddress();
  const chainId = useChainId();

  return useCallback(
    (transaction: NewTransaction) => {
      if (!address || !chainId) {
        throw new Error('No address or chain ID found');
      }

      store.addTransaction(address, chainId, transaction);
    },
    [store, address, chainId]
  );
}
