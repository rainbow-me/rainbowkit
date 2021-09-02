import React from 'react'
import { useTxHistory, etherscanFetcher, useConnectOnMount } from '@rainbowkit/hooks'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { setupProvider } from '@rainbowkit/utils'
import styles from '../styles/button.module.css'
import { EtherscanProvider, TransactionResponse } from '@ethersproject/providers'

import { formatEther } from '@ethersproject/units'
import { injected } from './badge'

export const provider = new EtherscanProvider('homestead')

const HistoryExample = () => {
  const { account: address } = useWeb3React()

  useConnectOnMount(injected, true)

  const {
    data: txes,
    loading,
    error
  } = useTxHistory<TransactionResponse, EtherscanProvider>({
    address: address || '0xD3B282e9880cDcB1142830731cD83f7ac0e1043f',
    fetcher: etherscanFetcher,
    provider
  })

  if (error) return <strong style={{ color: 'red' }}>Error! {error?.message}</strong>

  if (loading) return <p>Loading...</p>

  return (
    <>
      {txes?.slice(0, 10).map((tx) => (
        <div key={tx.hash} style={{ fontFamily: 'monospace' }}>
          <a href={`https://etherscan.io/tx/${tx.hash}`}>{tx.hash.slice(0, 8)}</a>
          {' | '}
          <span>Value: {parseFloat(formatEther(tx.value)).toPrecision(3)} ETH</span>
        </div>
      ))}
    </>
  )
}

export const History = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <HistoryExample />
  </Web3ReactProvider>
)
