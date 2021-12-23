import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { useWeb3State } from '@rainbow-me/kit-core'
import { NetworkSelect, Profile, RainbowkitThemeProvider, defaultTheme } from '@rainbow-me/kit-ui'
import { withWeb3React } from '@rainbow-me/kit-utils'
import React from 'react'
import { wallets } from '../lib/wallets'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')

const theme = defaultTheme({
  overrides: {
    colors: {
      connectionIndicator: '#2CCC00'
    }
  }
})

const Example = () => {
  const { chainId, provider } = useWeb3State()

  return (
    <RainbowkitThemeProvider theme={theme}>
      <nav
        style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(2, max-content)', width: 'max-content' }}
      >
        <Profile modalOptions={{ wallets }} ENSProvider={ENSProvider} />
        <NetworkSelect chains={['ethereum', 'arbitrum', 'polygon', 'ropsten']} {...{ provider, chainId }} />
      </nav>
    </RainbowkitThemeProvider>
  )
}

export default withWeb3React(Example)
