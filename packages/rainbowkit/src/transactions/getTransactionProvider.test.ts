import type { PublicClient } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import { describe, expect, it, vi } from 'vitest';
import { getTransactionProvider } from './getTransactionProvider';

const hash =
  '0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d';

function createDeferred<value>() {
  let resolve: (value: value) => void = () => {};
  const promise = new Promise<value>((resolve_) => {
    resolve = resolve_;
  });

  return { promise, resolve };
}

function createReceipt() {
  return { status: 'success' } as Awaited<
    ReturnType<typeof waitForTransactionReceipt>
  >;
}

function createProvider(uid: string) {
  const receipts: ReturnType<
    typeof createDeferred<ReturnType<typeof createReceipt>>
  >[] = [];
  const getTransactionReceipt = vi.fn(() => {
    const receipt = createDeferred<ReturnType<typeof createReceipt>>();
    receipts.push(receipt);
    return receipt.promise;
  });

  const provider = {
    getTransactionReceipt,
    pollingInterval: 1,
    uid,
  } as unknown as PublicClient & {
    getTransactionReceipt: ReturnType<typeof vi.fn>;
  };

  return { provider, receipts };
}

describe('getTransactionProvider', () => {
  it('uses a RainbowKit transaction watcher uid', () => {
    const { provider } = createProvider('app-client');

    expect(getTransactionProvider(provider)).toEqual(
      expect.objectContaining({
        uid: `${provider.uid}.rk-transactions`,
      }),
    );
  });

  it('documents viem watcher sharing for the same provider uid and hash', async () => {
    const { provider, receipts } = createProvider('app-client-shared');

    const wait = [
      waitForTransactionReceipt(provider, { hash, timeout: 0 }),
      waitForTransactionReceipt(provider, { hash, timeout: 0 }),
    ];

    expect(provider.getTransactionReceipt).toHaveBeenCalledTimes(1);

    receipts[0]?.resolve(createReceipt());
    await Promise.all(wait);
  });

  it('uses a separate viem watcher from the app provider for the same hash', async () => {
    const { provider, receipts } = createProvider('app-client-isolated');
    const transactionProvider = getTransactionProvider(provider);

    const wait = [
      waitForTransactionReceipt(provider, { hash, timeout: 0 }),
      waitForTransactionReceipt(transactionProvider, { hash, timeout: 0 }),
    ];

    expect(provider.getTransactionReceipt).toHaveBeenCalledTimes(2);

    receipts[0]?.resolve(createReceipt());
    receipts[1]?.resolve(createReceipt());
    await Promise.all(wait);
  });
});
