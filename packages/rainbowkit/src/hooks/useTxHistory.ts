import { useEffect, useState } from 'react';
import { useProvider } from 'wagmi';

const safeJSONParse = (json: string) => {
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
};

export const PENDING_TX_STATUS = 'pending';
export const SUCCESS_TX_STATUS = 'success';
export const FAIL_TX_STATUS = 'fail';

export type TransactionStatus =
  | typeof PENDING_TX_STATUS
  | typeof SUCCESS_TX_STATUS
  | typeof FAIL_TX_STATUS;

export type Transaction = {
  value: number;
  from: string;
  to: string;
  data?: string;
  blockNumber?: number;
  hash: string;
  type?: string;
  nonce?: number;
};

export type TransactionWithInfo = Transaction & {
  status: TransactionStatus;
  info: string;
};

/**
 * A React hook to manage transaction history state with manual updating
 * @returns transactions array
 */
export const useTxHistory = ({
  initialTxes,
  rememberHistory,
}: {
  initialTxes?: TransactionWithInfo[];
  rememberHistory?: boolean;
}): {
  txes: TransactionWithInfo[];
  submit: (tx: Transaction) => void;
  reset: () => void;
} => {
  const [txes, set] = useState<TransactionWithInfo[]>(initialTxes || []);
  const provider = useProvider();

  const submit = async (tx: Transaction) => {
    set(txes => [
      ...txes,
      {
        ...tx,
        info: 'tbd',
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
              info: 'tbd',
              status: 'fail',
            },
          ]);
        else if (provider) {
          provider.once(tx.hash, (result: any) => {
            set([
              ...txes.filter(t => t.hash !== tx.hash),
              {
                ...common,
                blockNumber: result.blockNumber,
                info: 'tbd',
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
