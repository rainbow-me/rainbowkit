import { TxHistory } from '@rainbowkit/ui'
import { useConnectOnMount, useExplorerTxHistory } from '@rainbowkit/hooks'
import { etherscanFetcher, setupProvider } from '@rainbowkit/utils'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import { injected } from './badge'
import { provider } from './history'
import { ChainProvider } from 'chain-provider'

const TxHistoryExampleDemo = () => {
  const { account: address, chainId } = useWeb3React()

  useConnectOnMount(injected, true)

  const { data: txes } = useExplorerTxHistory({
    fetcher: etherscanFetcher,
    provider: new ChainProvider('mainnet'),
    address
  })

  return <TxHistory {...{ provider, chainId, txes }} reset={() => void 0} />
}

export const TxHistoryExample = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <TxHistoryExampleDemo />
  </Web3ReactProvider>
)
