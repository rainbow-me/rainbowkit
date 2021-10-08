import { useEffect, useState } from 'react'
import { Transaction } from '@ethersproject/transactions'
import { BaseProvider, TransactionReceipt } from '@ethersproject/providers'

const safeJSONParse = (json: string) => {
  try {
    return JSON.parse(json)
  } catch {
    return {}
  }
}

export type TransactionWithStatus = Pick<Transaction, 'data' | 'from' | 'to' | 'value' | 'hash' | 'nonce' | 'type'> & {
  status: 'pending' | 'fail' | 'success'
  blockNumber: number | null
}

/**
 * Returns all pending txes
 */
export const useTxHistory = ({
  initialTxes,
  rememberHistory,
  provider
}: {
  initialTxes?: TransactionWithStatus[]
  rememberHistory?: boolean
  provider: BaseProvider
}): { txes: TransactionWithStatus[]; submit: (tx: Transaction) => void; reset: () => void } => {
  const [txes, set] = useState<TransactionWithStatus[]>(initialTxes || [])

  const submit = async (tx: Transaction) => {
    set((txes) => [
      ...txes,
      {
        ...tx,
        blockNumber: null,
        status: 'pending'
      }
    ])
  }

  useEffect(() => {
    for (const tx of txes) {
      if (tx.status === 'pending') {
        const common = {
          data: tx.data,
          from: tx.from,
          to: tx.to,
          hash: tx.hash,
          value: tx.value,
          type: tx.type,
          nonce: tx.nonce
        }

        if (!tx.hash)
          set([
            ...txes.filter((t) => t.hash !== tx.hash),
            {
              ...common,
              status: 'fail',
              blockNumber: null
            }
          ])
        else if (provider) {
          provider.once(tx.hash, (result: TransactionReceipt) => {
            set([
              ...txes.filter((t) => t.hash !== tx.hash),
              {
                ...common,
                status: result.status === 0 ? 'fail' : 'success',
                blockNumber: result.blockNumber
              }
            ])
          })
        }
      }
    }
    if (rememberHistory && txes?.[0]) {
      localStorage.setItem('rk-tx-history', JSON.stringify(txes))
    }
  }, [txes, rememberHistory, provider])

  useEffect(() => {
    if (rememberHistory) {
      const txes = safeJSONParse(localStorage.getItem('rk-tx-history')) || []

      set(txes)
    }
  }, [rememberHistory])

  const reset = () => {
    localStorage.removeItem('rk-last-history')
    set([])
  }

  return { txes, submit, reset }
}
