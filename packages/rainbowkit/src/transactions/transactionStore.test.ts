import type { PublicClient } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createTransactionStore } from './transactionStore';

vi.mock('viem/actions', () => ({
  waitForTransactionReceipt: vi.fn(),
}));

const account = '0x8ba1f109551bd432803012645ac136ddd64dba72';
const hash =
  '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d';

function transactionHash(index: number): string {
  return `0x${index.toString().padStart(64, '0')}`;
}

describe('transactionStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(waitForTransactionReceipt).mockReset();
  });

  it('marks reverted recent transactions as failed', async () => {
    vi.mocked(waitForTransactionReceipt).mockResolvedValue({
      status: 'reverted',
    } as Awaited<ReturnType<typeof waitForTransactionReceipt>>);

    const store = createTransactionStore({
      provider: { uid: 'app-client' } as PublicClient,
    });

    store.addTransaction(account, 1, {
      description: 'Mint NFT',
      hash,
    });
    await vi.waitFor(() => {
      expect(store.getTransactions(account, 1)[0]?.status).toBe('failed');
    });
  });

  it('marks rejected recent transaction waits as failed', async () => {
    vi.mocked(waitForTransactionReceipt).mockRejectedValue(
      new Error('Transaction not found'),
    );

    const store = createTransactionStore({
      provider: { uid: 'app-client' } as PublicClient,
    });

    store.addTransaction(account, 1, {
      description: 'Mint NFT',
      hash,
    });
    await vi.waitFor(() => {
      expect(store.getTransactions(account, 1)[0]?.status).toBe('failed');
    });
  });

  it('keeps at most 10 completed transactions without counting pending ones', async () => {
    window.localStorage.setItem(
      'rk-transactions',
      JSON.stringify({
        [account]: {
          1: Array.from({ length: 12 }, (_, index) => ({
            description: `Transaction ${index}`,
            hash: transactionHash(index),
            status: 'confirmed',
          })),
        },
      }),
    );
    vi.mocked(waitForTransactionReceipt).mockResolvedValue({
      status: undefined,
    } as unknown as Awaited<ReturnType<typeof waitForTransactionReceipt>>);

    const store = createTransactionStore({
      provider: { uid: 'app-client' } as PublicClient,
    });

    for (let index = 12; index < 15; index += 1) {
      store.addTransaction(account, 1, {
        description: `Pending transaction ${index}`,
        hash: transactionHash(index),
      });
    }

    const transactions = store.getTransactions(account, 1);
    expect(
      transactions.filter(({ status }) => status === 'confirmed'),
    ).toHaveLength(10);
    expect(
      transactions.filter(({ status }) => status === 'pending'),
    ).toHaveLength(3);
  });
});
