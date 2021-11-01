import { TransactionWithStatus } from '@rainbow-me/kit-hooks'
import React from 'react'
import { Tx as DefaultTx } from './Tx'
import type { TxProps } from './Tx'

export interface TxHistoryProps {
  /**
   * Custom `<Tx />` component
   */
  txComponent?: (props: TxProps) => JSX.Element

  classNames?: Partial<{
    container: string
  }>
  /**
   * Blockchain network ID
   */
  chainId: number
  /**
   * Array of currently saved transactions
   */
  txes: TransactionWithStatus[]
  /**
   * Erase all saved transactions from browser storage
   */
  reset?: () => void
}

export const TxHistory = ({ txes, txComponent: Tx = DefaultTx, chainId, reset }: TxHistoryProps) => {
  return (
    <div>
      {reset && <button onClick={() => reset()}>Clear transactions</button>}
      {txes?.map((tx) => (
        <Tx key={tx.hash} {...tx} chainId={chainId} />
      ))}
    </div>
  )
}
