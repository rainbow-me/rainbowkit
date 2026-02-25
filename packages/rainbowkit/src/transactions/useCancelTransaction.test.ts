import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { Transaction } from './transactionStore';
import { useCancelTransaction } from './useCancelTransaction';

const mockSendTransactionAsync = vi.hoisted(() => vi.fn());
const mockReplaceTransaction = vi.hoisted(() => vi.fn());
const mockAddress = '0x1234567890123456789012345678901234567890' as const;
const mockChainId = 1;

vi.mock('wagmi', () => ({
  useAccount: () => ({
    address: mockAddress,
  }),
  useSendTransaction: () => ({
    sendTransactionAsync: mockSendTransactionAsync,
  }),
}));

vi.mock('../hooks/useChainId', () => ({
  useChainId: () => mockChainId,
}));

vi.mock('./TransactionStoreContext', () => ({
  useTransactionStore: () => ({
    replaceTransaction: mockReplaceTransaction,
  }),
}));

describe('useCancelTransaction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw error for non-pending transactions', async () => {
    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'confirmed',
      nonce: 1,
      gasPrice: '1000000000',
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Can only cancel pending transactions',
    );
  });

  it('should throw error if transaction has no nonce', async () => {
    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      gasPrice: '1000000000',
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Transaction must have nonce to be replaced',
    );
  });

  it('should cancel transaction with legacy gas price', async () => {
    const newHash = '0xcancelHash123';
    mockSendTransactionAsync.mockResolvedValue(newHash);

    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
      from: mockAddress,
      to: '0x9876543210987654321098765432109876543210',
      value: '1000000000000000',
      gasPrice: '1000000000',
    };

    await act(async () => {
      const hash = await result.current(transaction, 1.5);
      expect(hash).toBe(newHash);
    });

    expect(mockSendTransactionAsync).toHaveBeenCalledWith({
      to: mockAddress,
      value: BigInt(0),
      nonce: 1,
      gasPrice: BigInt('1500000000'),
    });

    expect(mockReplaceTransaction).toHaveBeenCalledWith(
      mockAddress,
      mockChainId,
      '0xabc123',
      expect.objectContaining({
        hash: newHash,
        description: 'Cancel: Test transaction',
        nonce: 1,
        from: mockAddress,
        to: mockAddress,
        value: '0',
        gasPrice: '1500000000',
      }),
    );
  });

  it('should cancel transaction with EIP-1559 gas', async () => {
    const newHash = '0xcancelHash456';
    mockSendTransactionAsync.mockResolvedValue(newHash);

    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xdef456',
      description: 'EIP-1559 transaction',
      status: 'pending',
      nonce: 2,
      from: mockAddress,
      to: '0x9876543210987654321098765432109876543210',
      value: '2000000000000000',
      maxFeePerGas: '2000000000',
      maxPriorityFeePerGas: '1000000000',
    };

    await act(async () => {
      const hash = await result.current(transaction, 1.3);
      expect(hash).toBe(newHash);
    });

    expect(mockSendTransactionAsync).toHaveBeenCalledWith({
      to: mockAddress,
      value: BigInt(0),
      nonce: 2,
      maxFeePerGas: BigInt('2600000000'),
      maxPriorityFeePerGas: BigInt('1300000000'),
    });

    expect(mockReplaceTransaction).toHaveBeenCalledWith(
      mockAddress,
      mockChainId,
      '0xdef456',
      expect.objectContaining({
        hash: newHash,
        description: 'Cancel: EIP-1559 transaction',
        nonce: 2,
        maxFeePerGas: '2600000000',
        maxPriorityFeePerGas: '1300000000',
      }),
    );
  });

  it('should throw error if transaction has no gas fields', async () => {
    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xabc789',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Original transaction must have gas price or EIP-1559 gas fields',
    );
  });

  it('should handle sendTransaction errors', async () => {
    mockSendTransactionAsync.mockRejectedValue(new Error('User rejected'));

    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
      gasPrice: '1000000000',
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Failed to cancel transaction: User rejected',
    );

    expect(mockReplaceTransaction).not.toHaveBeenCalled();
  });

  it('should use default gas multiplier of 1.2', async () => {
    const newHash = '0xcancelHash789';
    mockSendTransactionAsync.mockResolvedValue(newHash);

    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
      gasPrice: '1000000000',
    };

    await act(async () => {
      await result.current(transaction);
    });

    expect(mockSendTransactionAsync).toHaveBeenCalledWith({
      to: mockAddress,
      value: BigInt(0),
      nonce: 1,
      gasPrice: BigInt('1200000000'),
    });
  });

  it('should always send to self with zero value', async () => {
    const newHash = '0xcancelHash999';
    mockSendTransactionAsync.mockResolvedValue(newHash);

    const { result } = renderHook(() => useCancelTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'High value transaction',
      status: 'pending',
      nonce: 5,
      from: mockAddress,
      to: '0x9876543210987654321098765432109876543210',
      value: '5000000000000000000',
      gasPrice: '2000000000',
    };

    await act(async () => {
      await result.current(transaction);
    });

    expect(mockSendTransactionAsync).toHaveBeenCalledWith({
      to: mockAddress,
      value: BigInt(0),
      nonce: 5,
      gasPrice: BigInt('2400000000'),
    });

    expect(mockReplaceTransaction).toHaveBeenCalledWith(
      mockAddress,
      mockChainId,
      '0xabc123',
      expect.objectContaining({
        to: mockAddress,
        value: '0',
      }),
    );
  });
});
