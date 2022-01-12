import { AlchemyWebSocketProvider } from '@ethersproject/providers'
import {
  useWeb3State,
  NetworkSelect,
  Profile,
  RainbowkitThemeProvider,
  withWeb3React,
  TxHistory,
  lightTheme,
  dimTheme,
  darkTheme,
  cssStringFromTheme
} from '@rainbow-me/rainbowkit'
import React, { useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { wallets } from '../lib/wallets'

const ENSProvider = new AlchemyWebSocketProvider('homestead', 'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo')
const themes = { lightTheme, dimTheme, darkTheme } as const
const darkModeThemes = { none: undefined, dimTheme, darkTheme } as const

const Example = () => {
  const { chainId, provider } = useWeb3State()
  const [themeName, setThemeName] = useState<keyof typeof themes>('lightTheme')
  const [darkModeThemeName, setDarkModeThemeName] = useState<keyof typeof darkModeThemes>('none')
  const [themingMethod, setThemingMethod] = useState<'provider' | 'css'>('provider')

  const content = (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: 'sans-serif', fontSize: 16 }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <label>
            Theme:{' '}
            <select
              style={{ fontSize: 16 }}
              value={themeName}
              onChange={(event) => setThemeName(event.currentTarget.value as keyof typeof themes)}
            >
              <option value="lightTheme">light</option>
              <option value="dimTheme">dim</option>
              <option value="darkTheme">dark</option>
            </select>
          </label>
          <label>
            Dark mode theme:{' '}
            <select
              style={{ fontSize: 16 }}
              value={darkModeThemeName}
              onChange={(event) => setDarkModeThemeName(event.currentTarget.value as keyof typeof darkModeThemes)}
            >
              <option value="none">none</option>
              <option value="dimTheme">dim</option>
              <option value="darkTheme">dark</option>
            </select>
          </label>
          <label>
            Theming method:{' '}
            <select
              style={{ fontSize: 16 }}
              value={themingMethod}
              onChange={(event) => setThemingMethod(event.currentTarget.value as typeof themingMethod)}
            >
              <option value="provider">provider</option>
              <option value="css">css</option>
            </select>
          </label>
        </div>

        <nav
          style={{
            display: 'grid',
            gap: '0.5rem',
            gridTemplateColumns: 'repeat(2, max-content)',
            width: 'max-content'
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
      </div>
    </>
  )

  const theme = themes[themeName]
  const darkModeTheme = darkModeThemes[darkModeThemeName]

  return themingMethod === 'provider' ? (
    <RainbowkitThemeProvider theme={theme} darkModeTheme={darkModeTheme}>
      {content}
    </RainbowkitThemeProvider>
  ) : (
    <>
      <style jsx global>
        {`
          :root {
            ${cssStringFromTheme(theme)}
          }

          @media (prefers-color-scheme: dark) {
            :root {
              ${cssStringFromTheme(darkModeTheme)}
            }
          }
        `}
      </style>
      {content}
    </>
  )
}

export default withWeb3React(Example)
