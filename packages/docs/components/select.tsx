import React from 'react'
import { NetworkSelect } from '@rainbowkit/badge'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { setupProvider } from '@rainbowkit/utils'
import { Activate } from './activate'

const Select = () => {
  const { library: provider } = useWeb3React()

  return (
    <>
      <Activate />
      <NetworkSelect chains={['ethereum', 'polygon', 'bsc', 'arbitrum', 'optimism']} provider={provider} />
    </>
  )
}

export const SelectNetworkExample = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <Select />
  </Web3ReactProvider>
)
