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
      <NetworkSelect
        chains={[
          'ethereum',
          'optimism',
          'arbitrum',
          'bsc',
          'polygon',
          'xdai',
          'ftm',
          'avax',
          'fuse',
          'huobi',
          'xdai arbitrum',
          'klaytn',
          'celo',
          'okex',
          'tomo',
          'callisto',
          'clover',
          'edgeware',
          'aurora',
          // testnets

          'ropsten',
          'rinkeby',
          'goerli',
          'kovan',
          'okex testnet',
          'bsc testnet',
          'eco testnet',
          'optimism goerli',
          'klaytn testnet',
          'avax testnet',
          'celo testnet',
          'polygon testnet',
          'arb testnet',
          'near testnet'
        ]}
        provider={provider}
      />
    </>
  )
}

export const SelectNetworkExample = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <Select />
  </Web3ReactProvider>
)
