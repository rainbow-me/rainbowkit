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
 * Manage transaction history state
 * @returns TransactionsWithInfo[]
 */
export const useTxHistory = ({
  initialTxs,
  rememberHistory,
}: {
  initialTxs?: TransactionWithInfo[];
  rememberHistory?: boolean;
}): {
  txs: TransactionWithInfo[];
  submitTx: (tx: Transaction) => void;
  resetTxs: () => void;
} => {
  const [txs, setTxs] = useState<TransactionWithInfo[]>(initialTxs || []);
  const provider = useProvider();

  const submitTx = async (tx: Transaction) => {
    setTxs(txs => [
      ...txs,
      {
        ...tx,
        info: 'tbd',
        status: 'pending',
      },
    ]);
  };

  useEffect(() => {
    for (const tx of txs) {
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
          setTxs([
            ...txs.filter(t => t.hash !== tx.hash),
            {
              ...common,
              info: 'tbd',
              status: 'fail',
            },
          ]);
        else if (provider) {
          provider.once(tx.hash, (result: any) => {
            setTxs([
              ...txs.filter(t => t.hash !== tx.hash),
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
    if (rememberHistory && txs?.[0]) {
      localStorage.setItem('rk-tx-history', JSON.stringify(txs));
    }
  }, [txs, rememberHistory, provider]);

  useEffect(() => {
    if (rememberHistory) {
      const txHistory = localStorage.getItem('rk-tx-history');
      const txs = txHistory ? safeJSONParse(txHistory) ?? [] : [];

      setTxs(txs);
    }
  }, [rememberHistory]);

  const resetTxs = () => {
    localStorage.removeItem('rk-last-history');
    setTxs([]);
  };

  return { resetTxs, submitTx, txs };
};
