import { useCallback } from 'react';
import type { Address } from 'viem';
import { useSendTransaction } from 'wagmi';
import { useAccount } from 'wagmi';
import { useChainId } from '../hooks/useChainId';
import { useTransactionStore } from './TransactionStoreContext';
import type { Transaction } from './transactionStore';

export function useSpeedUpTransaction() {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useChainId();
  const { sendTransactionAsync } = useSendTransaction();

  return useCallback(
    async (transaction: Transaction, gasMultiplier = 1.2) => {
      if (!address || !chainId) {
        throw new Error('No address or chain ID found');
      }

      if (transaction.status !== 'pending') {
        throw new Error('Can only speed up pending transactions');
      }

      if (!transaction.nonce) {
        throw new Error('Transaction must have nonce to be replaced');
      }

      if (!transaction.to) {
        throw new Error('Transaction must have destination address');
      }

      const baseGasPrice = transaction.gasPrice
        ? BigInt(transaction.gasPrice)
        : undefined;
      const baseMaxFeePerGas = transaction.maxFeePerGas
        ? BigInt(transaction.maxFeePerGas)
        : undefined;
      const baseMaxPriorityFeePerGas = transaction.maxPriorityFeePerGas
        ? BigInt(transaction.maxPriorityFeePerGas)
        : undefined;

      const multiplierBigInt = BigInt(Math.floor(gasMultiplier * 100));
      const hundred = BigInt(100);

      const newGasParams: {
        gasPrice?: bigint;
        maxFeePerGas?: bigint;
        maxPriorityFeePerGas?: bigint;
      } = {};

      if (baseGasPrice) {
        newGasParams.gasPrice = (baseGasPrice * multiplierBigInt) / hundred;
      } else if (baseMaxFeePerGas && baseMaxPriorityFeePerGas) {
        newGasParams.maxFeePerGas =
          (baseMaxFeePerGas * multiplierBigInt) / hundred;
        newGasParams.maxPriorityFeePerGas =
          (baseMaxPriorityFeePerGas * multiplierBigInt) / hundred;
      } else {
        throw new Error(
          'Original transaction must have gas price or EIP-1559 gas fields',
        );
      }

      try {
        const newHash = await sendTransactionAsync({
          to: transaction.to as Address,
          value: transaction.value ? BigInt(transaction.value) : undefined,
          data: transaction.data as `0x${string}` | undefined,
          nonce: transaction.nonce,
          ...newGasParams,
        });

        store.replaceTransaction(address, chainId, transaction.hash, {
          hash: newHash,
          description: `${transaction.description} (sped up)`,
          confirmations: transaction.confirmations,
          nonce: transaction.nonce,
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
          data: transaction.data,
          gasPrice: newGasParams.gasPrice?.toString(),
          maxFeePerGas: newGasParams.maxFeePerGas?.toString(),
          maxPriorityFeePerGas: newGasParams.maxPriorityFeePerGas?.toString(),
        });

        return newHash;
      } catch (error) {
        throw new Error(
          `Failed to speed up transaction: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    },
    [store, address, chainId, sendTransactionAsync],
  );
}
