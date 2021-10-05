import React from 'react'
import { NetworkSelect } from '@rainbowkit/ui'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { setupProvider } from '@rainbowkit/utils'
import { Activate } from './activate'
import { css } from '@linaria/core'

const Select = () => {
  const { library: provider, chainId } = useWeb3React()

  return (
    <>
      <Activate />
      <NetworkSelect
        chainId={chainId}
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
        classNames={{
          list: css`
            background-color: white;
          `
        }}
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
