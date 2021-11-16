import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { NetworkSelect, Profile, UnsupportedNetwork } from '@rainbow-me/kit-ui'
import { withWeb3React } from '@rainbow-me/kit-utils'
import React from 'react'
import { supportedChainIds, wallets } from '../lib/wallets'
import { useWeb3State } from '@rainbow-me/kit-core'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')

const Example = () => {
  const { chainId, provider, error } = useWeb3State()

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Profile modalOptions={{ wallets }} ENSProvider={ENSProvider} />
        <NetworkSelect {...{ provider, chainId }} chains={['ethereum', 'arbitrum', 'polygon', 'optimism']} />
        <UnsupportedNetwork isVisible={!!error} chainId={chainId} supportedChainIds={supportedChainIds} />
      </nav>
    </>
  )
}

export default withWeb3React(Example)
