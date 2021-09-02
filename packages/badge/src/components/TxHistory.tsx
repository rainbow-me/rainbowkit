import { BaseProvider } from '@ethersproject/providers'
import { etherscanFetcher, TxHistoryFetcher, useTxHistory } from '@rainbowkit/hooks'
import React from 'react'
import { Tx as DefaultTx } from './Tx'
import type { TxProps } from '../index'

export interface TxHistoryProps {
  txComponent?: (props: TxProps) => JSX.Element

  classNames?: Partial<{
    container: string
  }>
  address: string
  provider: BaseProvider
  fetcher?: TxHistoryFetcher
}

export const TxHistory = ({
  txComponent: Tx = DefaultTx,
  address,
  provider,
  fetcher = etherscanFetcher
}: TxHistoryProps) => {
  const { data: txes, error, loading } = useTxHistory({ address, provider, fetcher })

  if (error) return <div>Error! Failed to fetch transactions</div>

  return (
    <div>
      {txes?.map((tx) => (
        <Tx key={tx.hash} status="success" {...tx} />
      ))}
    </div>
  )
}
