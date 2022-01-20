import { BigNumber } from '@ethersproject/bignumber';
import { BaseProvider, TransactionReceipt } from '@ethersproject/providers';
import { useEffect, useState } from 'react';

const safeJSONParse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
};

export type TransactionStatus = 'pending' | 'fail' | 'success';

export type Transaction = {
  value: BigNumber;
  from: string;
  to: string;
  data?: string;
  blockNumber?: number;
  hash: string;
  type?: string;
  nonce?: number;
};

export type TransactionWithStatus = Transaction & {
  status: TransactionStatus;
};

/**
 * A React hook to manage transaction history state with manual updating
 * @returns transactions array
 */
export const useTxHistory = ({
  initialTxes,
  provider,
  rememberHistory,
}: {
  initialTxes?: TransactionWithStatus[];
  rememberHistory?: boolean;
  provider: BaseProvider;
}): {
  txes: TransactionWithStatus[];
  submit: (tx: Transaction) => void;
  reset: () => void;
} => {
  const [txes, set] = useState<TransactionWithStatus[]>(initialTxes || []);

  const submit = async (tx: Transaction) => {
    set(txes => [
      ...txes,
      {
        ...tx,
        status: 'pending',
      },
    ]);
  };

  useEffect(() => {
    for (const tx of txes) {
      if (tx.status === 'pending') {
        const common = {
          data: tx.data,
          from: tx.from,
          hash: tx.hash,
          nonce: tx.nonce,
          to: tx.to,
          type: tx.type,
          value: tx.value,
        };

        if (!tx.hash)
          set([
            ...txes.filter(t => t.hash !== tx.hash),
            {
              ...common,
              status: 'fail',
            },
          ]);
        else if (provider) {
          provider.once(tx.hash, (result: TransactionReceipt) => {
            set([
              ...txes.filter(t => t.hash !== tx.hash),
              {
                ...common,
                blockNumber: result.blockNumber,
                status: result.status === 0 ? 'fail' : 'success',
              },
            ]);
          });
        }
      }
    }
    if (rememberHistory && txes?.[0]) {
      localStorage.setItem('rk-tx-history', JSON.stringify(txes));
    }
  }, [txes, rememberHistory, provider]);

  useEffect(() => {
    if (rememberHistory) {
      const txHistory = localStorage.getItem('rk-tx-history');
      const txes = txHistory ? safeJSONParse(txHistory) ?? [] : [];

      set(txes);
    }
  }, [rememberHistory]);

  const reset = () => {
    localStorage.removeItem('rk-last-history');
    set([]);
  };

  return { reset, submit, txes };
};
