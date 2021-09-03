import { BaseProvider } from '@ethersproject/providers'
import { etherscanFetcher, TxHistoryFetcher, useTxHistory } from '@rainbowkit/hooks'
import React from 'react'
import { Tx as DefaultTx } from './Tx'
import type { TxProps } from '../index'
import loadingIcon from '../../assets/loading.svg'
import styles from '../../styles/TxHistory.module.css'

export interface TxHistoryProps {
  txComponent?: (props: TxProps) => JSX.Element

  classNames?: Partial<{
    container: string
  }>
  address: string
  provider: BaseProvider
  fetcher?: TxHistoryFetcher
  options: Record<string, any>
}

export const TxHistory = ({
  txComponent: Tx = DefaultTx,
  address,
  provider,
  fetcher = etherscanFetcher,
  options
}: TxHistoryProps) => {
  const { data: txes, error, loading } = useTxHistory({ address, provider, fetcher, options })

  if (loading && !error)
    return (
      <div className={styles.loading}>
        <img src={loadingIcon} alt="loading..." aria-roledescription="Loading icon" /> Loading...
      </div>
    )

  if (error) {
    console.error(error)

    return (
      <div className={styles.error}>
        <strong>Error!</strong> Failed to fetch transactions
      </div>
    )
  }

  return (
    <div>
      {txes?.map((tx) => (
        <Tx key={tx.hash} status="success" {...tx} />
      ))}
    </div>
  )
}
