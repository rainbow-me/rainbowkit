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
});
