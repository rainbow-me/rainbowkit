import { providers } from 'ethers';

const storageKey = 'rk-transactions';

type TransactionStatus = 'pending' | 'confirmed' | 'failed';

export interface Transaction {
  hash: string;
  description: string;
  status: TransactionStatus;
  confirmations?: number;
}

export type NewTransaction = Omit<Transaction, 'status'>;

type Data = Record<string, Record<number, Transaction[] | undefined>>;

function safeParseJsonData(string: string | null): Data {
  try {
    const value = string ? JSON.parse(string) : {};
    return typeof value === 'object' ? value : {};
  } catch (err) {
    return {};
  }
}

function loadData(): Data {
  return safeParseJsonData(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(storageKey)
      : null
  );
}

const transactionHashRegex = /^0x([A-Fa-f0-9]{64})$/;

function validateTransaction(
  transaction: Transaction | NewTransaction
): string[] {
  const errors: string[] = [];

  if (!transactionHashRegex.test(transaction.hash)) {
    errors.push('Invalid transaction hash');
  }

  if (typeof transaction.description !== 'string') {
    errors.push('Transaction must have a description');
  }

  if (
    typeof transaction.confirmations !== 'undefined' &&
    (!Number.isInteger(transaction.confirmations) ||
      transaction.confirmations < 1)
  ) {
    errors.push('Transaction confirmations must be a positiver integer');
  }

  return errors;
}

export function createTransactionStore({
  provider: initialProvider,
}: {
  provider: providers.BaseProvider;
}) {
  let data: Data = loadData();

  let provider = initialProvider;
  const listeners: Set<() => void> = new Set();
  const transactionRequestCache: Map<string, Promise<void>> = new Map();

  function setProvider(newProvider: providers.BaseProvider): void {
    provider = newProvider;
  }

  function getTransactions(account: string, chainId: number): Transaction[] {
    return data[account]?.[chainId] ?? [];
  }

  function addTransaction(
    account: string,
    chainId: number,
    transaction: NewTransaction
  ): void {
    const errors = validateTransaction(transaction);

    if (errors.length > 0) {
      throw new Error(['Unable to add transaction', ...errors].join('\n'));
    }

    updateTransactions(account, chainId, transactions => {
      return [
        { ...transaction, status: 'pending' },
        ...transactions.filter(({ hash }) => {
          // Omit any duplicate transactions
          return hash !== transaction.hash;
        }),
      ];
    });
  }

  function clearTransactions(account: string, chainId: number): void {
    updateTransactions(account, chainId, () => {
      return [];
    });
  }

  function setTransactionStatus(
    account: string,
    chainId: number,
    hash: string,
    status: TransactionStatus
  ): void {
    updateTransactions(account, chainId, transactions => {
      return transactions.map(transaction =>
        transaction.hash === hash ? { ...transaction, status } : transaction
      );
    });
  }

  async function waitForPendingTransactions(
    account: string,
    chainId: number
  ): Promise<void> {
    await Promise.all(
      getTransactions(account, chainId)
        .filter(transaction => transaction.status === 'pending')
        .map(async transaction => {
          const { confirmations, hash } = transaction;

          const existingRequest = transactionRequestCache.get(hash);

          if (existingRequest) {
            return await existingRequest;
          }

          const requestPromise = provider
            .waitForTransaction(hash, confirmations)
            .then(({ status }) => {
              transactionRequestCache.delete(hash);

              if (status === undefined) {
                return;
              }

              setTransactionStatus(
                account,
                chainId,
                hash,
                status === 0 ? 'failed' : 'confirmed'
              );
            });

          transactionRequestCache.set(hash, requestPromise);

          return await requestPromise;
        })
    );
  }

  function updateTransactions(
    account: string,
    chainId: number,
    updateFn: (transactions: Transaction[]) => Transaction[]
  ): void {
    // Ensure we’re always operating on the latest data in case we have
    // multiple instances/tabs/etc. since we write all data back to
    // local storage after updating
    data = loadData();

    data[account] = data[account] ?? {};

    let completedTransactionCount = 0;
    const MAX_COMPLETED_TRANSACTIONS = 10;
    const transactions = updateFn(data[account][chainId] ?? [])
      // Keep the list of completed transactions from growing indefinitely
      .filter(({ status }) => {
        return status === 'pending'
          ? true
          : completedTransactionCount++ <= MAX_COMPLETED_TRANSACTIONS;
      });

    data[account][chainId] = transactions.length > 0 ? transactions : undefined;

    persistData();
    notifyListeners();
    waitForPendingTransactions(account, chainId);
  }

  function persistData(): void {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  function notifyListeners(): void {
    listeners.forEach(listener => listener());
  }

  function onChange(fn: () => void): () => void {
    listeners.add(fn);

    return () => {
      listeners.delete(fn);
    };
  }

  return {
    addTransaction,
    clearTransactions,
    getTransactions,
    onChange,
    setProvider,
    waitForPendingTransactions,
  };
}

export type TransactionStore = ReturnType<typeof createTransactionStore>;
