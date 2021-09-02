import { TxHistory } from '@rainbowkit/badge'
import { useConnectOnMount } from '@rainbowkit/hooks'
import { setupProvider } from '@rainbowkit/utils'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import { injected } from './badge'
import { provider } from './history'

const TxHistoryExampleDemo = () => {
  const { account: address } = useWeb3React()

  useConnectOnMount(injected, true)

  return <TxHistory address={address || '0xD3B282e9880cDcB1142830731cD83f7ac0e1043f'} provider={provider} />
}

export const TxHistoryExample = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <TxHistoryExampleDemo />
  </Web3ReactProvider>
)
