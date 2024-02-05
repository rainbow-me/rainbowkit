import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useChainId } from '../hooks/useChainId';
import { useTransactionStore } from './TransactionStoreContext';

export function useClearRecentTransactions(): () => void {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useChainId();

  return useCallback(() => {
    if (!address || !chainId) {
      throw new Error('No address or chain ID found');
    }

    store.clearTransactions(address, chainId);
  }, [store, address, chainId]);
}
