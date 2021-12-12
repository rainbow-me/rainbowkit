import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { useWeb3State } from '@rainbow-me/kit-core'
import { NetworkSelect, Profile } from '@rainbow-me/kit-ui'
import { withWeb3React } from '@rainbow-me/kit-utils'
import React from 'react'
import { wallets } from '../lib/wallets'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')

const Example = () => {
  const { chainId, provider } = useWeb3State()
  return (
    <>
      <nav
        style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(2, max-content)', width: 'max-content' }}
      >
        <Profile modalOptions={{ wallets }} ENSProvider={ENSProvider} />
        <NetworkSelect chains={['ethereum', 'arbitrum', 'polygon', 'ropsten']} {...{ provider, chainId }} />
      </nav>
    </>
  )
}

export default withWeb3React(Example)
