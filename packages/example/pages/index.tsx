import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { NetworkSelect, Profile } from '@rainbow-me/kit-ui'
import { withWeb3React } from '@rainbow-me/kit-utils'
import React from 'react'
import { wallets } from '../lib/wallets'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')

const Example = () => {
  return (
    <>
      <nav
        style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(2, max-content)', width: 'max-content' }}
      >
        <Profile modalOptions={{ wallets }} ENSProvider={ENSProvider} />
        <NetworkSelect chains={['ethereum', 'arbitrum', 'polygon', 'optimism', 'ropsten']} />
      </nav>
    </>
  )
}

export default withWeb3React(Example)
