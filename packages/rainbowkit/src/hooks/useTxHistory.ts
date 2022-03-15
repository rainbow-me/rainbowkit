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
  txs: TransactionWithInfo[];
  submitTx: (tx: Transaction, address: string, chainId: number) => void;
  resetTxs: () => void;
} => {
  const [txMap, setTxMap] = useState<TransactionsMap>(initialTxs || {});
  const provider = useProvider();
  const [{ data: networkData }] = useNetwork();
  const [{ data: accountData }] = useAccount();
  const chainId = networkData.chain?.id;
  const address = accountData?.address;

  const [txs, setTxs] = useState<TransactionWithInfo[]>([]);

  const submitTx = async (tx: Transaction) => {
    if (address && chainId) {
      setTxMap(tMap => ({
        ...tMap,
        [address]: {
          ...tMap?.[address],
          [chainId]: [
            ...tMap?.[address]?.[chainId],
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
    if (chainId && address && txMap) {
      setTxs(txMap?.[address]?.[chainId]);
    }
  }, [chainId, address, txMap]);

  useEffect(() => {
    if (address && chainId && txMap?.[address]?.[chainId]) {
      const currentTxs = txMap[address][chainId];
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
            setTxMap(tMap => ({
              ...tMap,
              [address]: {
                ...tMap?.[address],
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
              setTxMap(tMap => ({
                ...tMap,
                [address]: {
                  ...tMap?.[address],
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
      if (rememberHistory && txMap) {
        localStorage.setItem('rk-tx-history', JSON.stringify(txMap));
      }
    }
  }, [txMap, rememberHistory, provider, chainId, address]);

  useEffect(() => {
    if (rememberHistory) {
      const txHistory = localStorage.getItem('rk-tx-history');
      const storedTxMap = txHistory ? safeJSONParse(txHistory) ?? {} : {};

      setTxMap(storedTxMap);
    }
  }, [rememberHistory]);

  const resetTxs = () => {
    localStorage.removeItem('rk-last-history');
    setTxMap({});
  };

  return { resetTxs, submitTx, txs };
};
