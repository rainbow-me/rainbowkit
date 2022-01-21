import { BigNumber } from '@ethersproject/bignumber';
import { AlchemyWebSocketProvider } from '@ethersproject/providers';
import {
  cssStringFromTheme,
  darkTheme,
  dimTheme,
  lightTheme,
  NetworkSelect,
  Profile,
  RainbowkitThemeProvider,
  TxHistory,
  useWeb3State,
  withWeb3React,
} from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
import { wallets } from '../lib/wallets';

const ENSProvider = new AlchemyWebSocketProvider(
  'homestead',
  'vINSe04ri6EJ_hs94sK88MMeIBVPhnNo'
);
const themes = { darkTheme, dimTheme, lightTheme } as const;
const darkModeThemes = { darkTheme, dimTheme, none: undefined } as const;

const Example = () => {
  const { chainId, provider } = useWeb3State();
  const [themeName, setThemeName] = useState<keyof typeof themes>('lightTheme');
  const [darkModeThemeName, setDarkModeThemeName] =
    useState<keyof typeof darkModeThemes>('none');
  const [themingMethod, setThemingMethod] = useState<'provider' | 'css'>(
    'provider'
  );

  const content = (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          fontSize: 16,
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', gap: 20 }}>
          <label>
            Theme:{' '}
            <select
              onChange={event =>
                setThemeName(event.currentTarget.value as keyof typeof themes)
              }
              style={{ fontSize: 16 }}
              value={themeName}
            >
              <option value="lightTheme">light</option>
              <option value="dimTheme">dim</option>
              <option value="darkTheme">dark</option>
            </select>
          </label>
          <label>
            Dark mode theme:{' '}
            <select
              onChange={event =>
                setDarkModeThemeName(
                  event.currentTarget.value as keyof typeof darkModeThemes
                )
              }
              style={{ fontSize: 16 }}
              value={darkModeThemeName}
            >
              <option value="none">none</option>
              <option value="dimTheme">dim</option>
              <option value="darkTheme">dark</option>
            </select>
          </label>
          <label>
            Theming method:{' '}
            <select
              onChange={event =>
                setThemingMethod(
                  event.currentTarget.value as typeof themingMethod
                )
              }
              style={{ fontSize: 16 }}
              value={themingMethod}
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
            width: 'max-content',
          }}
        >
          <Profile ENSProvider={ENSProvider} modalOptions={{ wallets }} />
          <NetworkSelect
            chains={['ethereum', 'arbitrum', 'polygon', 'ropsten']}
            {...{ chainId, provider }}
          />
        </nav>
        <TxHistory
          chainId={chainId}
          txes={[
            {
              from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
              hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074231',
              status: 'pending',
              to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
              value: BigNumber.from(0),
            },
            {
              from: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
              hash: '0xb26f5aadaa59932d27e86aa2e754b81ebc66e68b00514ad3bdad94d210074440',
              status: 'fail',
              to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
              value: BigNumber.from(0),
            },
            {
              data: '0x',
              from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
              hash: '0x0dce30c7f31bcb3bf45b4ead6e0389b25b75d2be78264eeeea948323c414c2c7',
              status: 'success',
              to: '0x459aB34E608A8aF195c5A1995D9BCa3a1Fb0C159',
              value: BigNumber.from(BigInt(1.27 * 10 ** 18)),
            },
            {
              from: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
              hash: '0x06c9d030c00d78caf7131f128392df9255607aef31b5555f1744fe963814dabd',
              status: 'success',
              to: '0x604Ee422975E74050Eeaa3fC74BAbf6E008C0acC',
              value: BigNumber.from(0),
            },
          ]}
        />
      </div>
    </>
  );

  const theme = themes[themeName];
  const darkModeTheme = darkModeThemes[darkModeThemeName];

  return themingMethod === 'provider' ? (
    <RainbowkitThemeProvider darkModeTheme={darkModeTheme} theme={theme}>
      {content}
    </RainbowkitThemeProvider>
  ) : (
    <>
      <style global jsx>
        {`
          :root {
            ${cssStringFromTheme(theme)}
          }

          @media (prefers-color-scheme: dark) {
            :root {
              ${cssStringFromTheme(darkModeTheme, { extends: theme })}
            }
          }
        `}
      </style>
      {content}
    </>
  );
};

export default withWeb3React(Example);
