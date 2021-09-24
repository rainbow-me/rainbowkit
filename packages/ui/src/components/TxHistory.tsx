import { BaseProvider } from '@ethersproject/providers'
import { useTxHistory } from '@rainbowkit/hooks'
import { logsFetcher, TxHistoryFetcher } from '@rainbowkit/utils'
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
  address: string
  provider: BaseProvider
  chainId: number
  fetcher?: TxHistoryFetcher
  options?: Record<string, any>
}

const Status = styled.div`
  border-radius: 15px;
  padding: 15px;
  width: max-content;
`

const Error = styled(Status)`
  background-color: red;
  border: 3px solid #ee0011;
  color: white;
  box-shadow: 3px 10px 30px rgba(245, 0, 0, 0.2);
`

const Loading = styled(Status)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: rgb(221, 221, 221);

  img {
    margin-right: 1rem;
    height: 1rem;
    width: 1rem;
  }
`

export const TxHistory = ({
  txComponent: Tx = DefaultTx,
  address,
  provider,
  fetcher = logsFetcher,
  options = {},
  chainId
}: TxHistoryProps) => {
  const { data: txes, error, loading } = useTxHistory({ address, provider, fetcher, options })

  if (loading && !error)
    return (
      <Loading>
        <img src={loadingIcon} alt="loading..." aria-roledescription="Loading icon" /> Loading...
      </Loading>
    )

  if (error) {
    console.error(error)

    return (
      <Error>
        <strong>Error!</strong> {error?.data?.message || error.message || 'Failed to fetch transactions'}
      </Error>
    )
  }

  return (
    <div>
      {txes?.map((tx) => (
        <Tx key={tx.hash} {...tx} chainId={chainId} status={tx.status} />
      ))}
    </div>
  )
}
