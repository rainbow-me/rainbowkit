import { useEffect, useState } from 'react';
import { useAccount, useNetwork, useProvider } from 'wagmi';

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

export type TransactionsMap = {
  [address: string]: { [chainId: number]: TransactionWithInfo[] };
};

/**
 * Manage transaction history state
 */
export const useTxHistory = ({
  initialTxs,
  rememberHistory,
}: {
  initialTxs?: TransactionsMap;
  rememberHistory?: boolean;
}): {
  txs: TransactionsMap;
  submitTx: (tx: Transaction, address: string, chainId: number) => void;
  resetTxs: () => void;
} => {
  const [txs, setTxs] = useState<TransactionsMap>(initialTxs || {});
  const provider = useProvider();
  const [{ data: networkData }] = useNetwork();
  const [{ data: accountData }] = useAccount();
  const chainId = networkData.chain?.id;
  const address = accountData?.address;

  const submitTx = async (tx: Transaction) => {
    if (address && chainId) {
      setTxs(txs => ({
        ...txs,
        [address]: {
          ...txs?.[address],
          [chainId]: [
            ...txs?.[address]?.[chainId],
            {
              ...tx,
              info: 'tbd',
              status: 'pending',
            },
          ],
        },
      }));
    }
  };

  useEffect(() => {
    if (address && chainId && txs?.[address]?.[chainId]) {
      const currentTxs = txs?.[address]?.[chainId];
      for (const tx of currentTxs) {
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
            setTxs(txs => ({
              ...txs,
              [address]: {
                ...txs?.[address],
                [chainId]: [
                  ...currentTxs.filter(t => t.hash !== tx.hash),
                  {
                    ...common,
                    info: 'tbd',
                    status: 'fail',
                  },
                ],
              },
            }));
          else if (provider) {
            provider.once(tx.hash, (result: any) => {
              setTxs(txs => ({
                ...txs,
                [address]: {
                  ...txs?.[address],
                  [chainId]: [
                    ...currentTxs.filter(t => t.hash !== tx.hash),
                    {
                      ...common,
                      blockNumber: result.blockNumber,
                      info: 'tbd',
                      status: result.status === 0 ? 'fail' : 'success',
                    },
                  ],
                },
              }));
            });
          }
        }
      }
      if (rememberHistory && txs) {
        localStorage.setItem('rk-tx-history', JSON.stringify(txs));
      }
    }
  }, [txs, rememberHistory, provider, chainId, address]);

  useEffect(() => {
    if (rememberHistory) {
      const txHistory = localStorage.getItem('rk-tx-history');
      const txs = txHistory ? safeJSONParse(txHistory) ?? {} : {};

      setTxs(txs);
    }
  }, [rememberHistory]);

  const resetTxs = () => {
    localStorage.removeItem('rk-last-history');
    setTxs({});
  };

  return { resetTxs, submitTx, txs };
};
