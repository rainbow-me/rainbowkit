import type { PublicClient } from 'viem';

const transactionWatcherKey = 'rk-transactions';

export function getTransactionProvider(provider: PublicClient): PublicClient {
  const uid = `${provider.uid}.${transactionWatcherKey}`;

  // viem dedupes receipt watchers by client UID and hash. RainbowKit uses a
  // stable app-wide UID suffix so its internal watchers don't share observer
  // state with app-level transaction waits for the same hash.
  return {
    ...provider,
    uid,
  } as PublicClient;
}
