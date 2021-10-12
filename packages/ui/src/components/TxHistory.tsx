import { BaseProvider } from '@ethersproject/providers'
import { TransactionWithStatus } from '@rainbow-me/kit-hooks'
import React from 'react'
import { Tx as DefaultTx } from './Tx'
import type { TxProps } from './Tx'
import loadingIcon from '../../assets/loading.svg'
import { styled } from '@linaria/react'

export interface TxHistoryProps {
  txComponent?: (props: TxProps) => JSX.Element

  classNames?: Partial<{
    container: string
  }>
  chainId: number
  txes: TransactionWithStatus[]
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
