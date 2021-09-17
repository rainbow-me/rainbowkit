import { TxHistory } from '@rainbowkit/ui'
import { useConnectOnMount } from '@rainbowkit/hooks'
import { setupProvider } from '@rainbowkit/utils'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import { injected } from './badge'
import { provider } from './history'

const TxHistoryExampleDemo = () => {
  const { account: address, chainId } = useWeb3React()

  useConnectOnMount(injected, true)

  return (
    <TxHistory
      {...{ provider, chainId }}
      address={address || '0xD3B282e9880cDcB1142830731cD83f7ac0e1043f'}
      options={{ fromBlock: 12862901 }}
    />
  )
}

export const TxHistoryExample = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <TxHistoryExampleDemo />
  </Web3ReactProvider>
)
