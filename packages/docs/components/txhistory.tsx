import { TxHistory } from '@rainbowkit/ui'
import { useConnectOnMount, useExplorerTxHistory, useWeb3State } from '@rainbowkit/hooks'
import { etherscanFetcher, setupProvider } from '@rainbowkit/utils'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import React, { useEffect } from 'react'
import { injected } from './badge'
import { ChainProvider } from 'chain-provider'
import { useState } from 'react'

const TxHistoryExampleDemo = () => {
  const { address, chainId, provider } = useWeb3State()
  const [latestBlock, setLatestBlock] = useState(12862901)

  useConnectOnMount(injected, true)

  const { data: txes } = useExplorerTxHistory({
    fetcher: etherscanFetcher,
    provider: new ChainProvider('mainnet'),
    address,
    options: {
      fromBlock: latestBlock
    }
  })

  useEffect(() => {
    if (provider) provider.getBlockNumber().then((block) => setLatestBlock(block - 100_000))
  }, [provider])

  return <TxHistory {...{ chainId, txes }} />
}

export const TxHistoryExample = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <TxHistoryExampleDemo />
  </Web3ReactProvider>
)
