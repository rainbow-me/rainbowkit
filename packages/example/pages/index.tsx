import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import { useWeb3State } from '@rainbow-me/kit-core'
import { NetworkSelect, Profile, RainbowkitThemeProvider, defaultTheme, TxHistory } from '@rainbow-me/kit-ui'
import { withWeb3React } from '@rainbow-me/kit-utils'
import React from 'react'
import { BigNumber } from '@ethersproject/bignumber'
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
        style={{
          display: 'grid',
          gap: '0.5rem',
          gridTemplateColumns: 'repeat(2, max-content)',
          width: 'max-content',
          marginBottom: '3rem'
        }}
      >
        <Profile modalOptions={{ wallets }} ENSProvider={ENSProvider} />
        <NetworkSelect chains={['ethereum', 'arbitrum', 'polygon', 'ropsten']} {...{ provider, chainId }} />
      </nav>
      <TxHistory
        chainId={chainId}
        txes={[
          {
            status: 'pending',
            value: BigNumber.from(0),
            hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074231',
            from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
            to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC'
          },
          {
            status: 'fail',
            value: BigNumber.from(0),
            from: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
            to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
            hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074440'
          },
          {
            status: 'success',
            data: '0x',
            value: BigNumber.from(BigInt(1.27 * 10 ** 18)),
            hash: '0x0dce30c7f31bcb3bf45b4ead6e0389b25b75d2be78264eeeea948323c414c2c7',
            from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
            to: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159'
          },
          {
            status: 'success',
            value: BigNumber.from(0),
            hash: '0x06c9d030c00d78caf7131f128392df9255607aef31b5555f1744fe963814dabd',
            from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
            to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC'
          }
        ]}
      />
    </RainbowkitThemeProvider>
  )
}

export default withWeb3React(Example)
