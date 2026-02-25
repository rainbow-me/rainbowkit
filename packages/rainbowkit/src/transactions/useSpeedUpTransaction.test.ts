import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { Transaction } from './transactionStore';
import { useSpeedUpTransaction } from './useSpeedUpTransaction';

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

describe('useSpeedUpTransaction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should throw error for non-pending transactions', async () => {
    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'confirmed',
      nonce: 1,
      to: mockAddress,
      gasPrice: '1000000000',
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Can only speed up pending transactions',
    );
  });

  it('should throw error if transaction has no nonce', async () => {
    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      to: mockAddress,
      gasPrice: '1000000000',
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Transaction must have nonce to be replaced',
    );
  });

  it('should throw error if transaction has no destination address', async () => {
    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
      gasPrice: '1000000000',
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Transaction must have destination address',
    );
  });

  it('should speed up transaction with legacy gas price', async () => {
    const newHash = '0xnewHash123';
    mockSendTransactionAsync.mockResolvedValue(newHash);

    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
      from: mockAddress,
      to: mockAddress,
      value: '1000000000000000',
      gasPrice: '1000000000',
    };

    await act(async () => {
      const hash = await result.current(transaction, 1.5);
      expect(hash).toBe(newHash);
    });

    expect(mockSendTransactionAsync).toHaveBeenCalledWith({
      to: mockAddress,
      value: BigInt('1000000000000000'),
      data: undefined,
      nonce: 1,
      gasPrice: BigInt('1500000000'),
    });

    expect(mockReplaceTransaction).toHaveBeenCalledWith(
      mockAddress,
      mockChainId,
      '0xabc123',
      expect.objectContaining({
        hash: newHash,
        description: 'Test transaction (sped up)',
        nonce: 1,
        gasPrice: '1500000000',
      }),
    );
  });

  it('should speed up transaction with EIP-1559 gas', async () => {
    const newHash = '0xnewHash456';
    mockSendTransactionAsync.mockResolvedValue(newHash);

    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xdef456',
      description: 'EIP-1559 transaction',
      status: 'pending',
      nonce: 2,
      from: mockAddress,
      to: mockAddress,
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
      value: BigInt('2000000000000000'),
      data: undefined,
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
        description: 'EIP-1559 transaction (sped up)',
        nonce: 2,
        maxFeePerGas: '2600000000',
        maxPriorityFeePerGas: '1300000000',
      }),
    );
  });

  it('should throw error if transaction has no gas fields', async () => {
    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xabc789',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
      to: mockAddress,
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Original transaction must have gas price or EIP-1559 gas fields',
    );
  });

  it('should handle sendTransaction errors', async () => {
    mockSendTransactionAsync.mockRejectedValue(new Error('User rejected'));

    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Test transaction',
      status: 'pending',
      nonce: 1,
      to: mockAddress,
      gasPrice: '1000000000',
    };

    await expect(result.current(transaction)).rejects.toThrow(
      'Failed to speed up transaction: User rejected',
    );

    expect(mockReplaceTransaction).not.toHaveBeenCalled();
  });

  it('should include transaction data if present', async () => {
    const newHash = '0xnewHash789';
    mockSendTransactionAsync.mockResolvedValue(newHash);

    const { result } = renderHook(() => useSpeedUpTransaction());

    const transaction: Transaction = {
      hash: '0xabc123',
      description: 'Contract interaction',
      status: 'pending',
      nonce: 3,
      from: mockAddress,
      to: '0x9876543210987654321098765432109876543210',
      value: '0',
      data: '0xa9059cbb',
      gasPrice: '1000000000',
    };

    await act(async () => {
      await result.current(transaction);
    });

    expect(mockSendTransactionAsync).toHaveBeenCalledWith({
      to: '0x9876543210987654321098765432109876543210',
      value: BigInt(0),
      data: '0xa9059cbb',
      nonce: 3,
      gasPrice: BigInt('1200000000'),
    });
  });
});
