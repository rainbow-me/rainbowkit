import '@rainbow-me/rainbowkit/styles.css';
import {
  Chain,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import { chain, WagmiProvider } from 'wagmi';

const infuraId = '0c8c992691dc4bfe97b4365a27fb2ce4';

const isChainSupported = (chainId?: number) =>
  chains.some(x => x.id === chainId);

const provider = ({ chainId }) =>
  new providers.InfuraProvider(
    isChainSupported(chainId) ? chainId : chain.mainnet.id,
    infuraId
  );

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimisticEthereum, name: 'Optimism' },
  { ...chain.arbitrumOne, name: 'Arbitrum' },
];

const wallets = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
  infuraId,
  jsonRpcUrl: ({ chainId }) =>
    `${
      chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0]
    }/${infuraId}`,
});

const connectors = connectorsForWallets(wallets);

const THEMES = {
  dark: darkTheme,
  light: lightTheme,
  midnight: midnightTheme,
};

export type Modes = keyof typeof THEMES;
export type Accents = 'blue' | 'purple' | 'green' | 'pink';
export type Radii = 'large' | 'medium' | 'small' | 'none';

function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<Modes>('light');
  const [accent, setAccent] = useState<Accents>('blue');
  const [radii, setRadii] = useState<Radii>('large');

  const handleModeChange = e => setMode(e.target.value);
  const handleAccentChange = e => setAccent(e.target.value);
  const handleRadiiChange = e => setRadii(e.target.value);

  const selectedTheme = THEMES[mode]({
    accentColor: accent,
    borderRadius: radii,
  });

  return (
    <WagmiProvider autoConnect connectors={connectors} provider={provider}>
      <RainbowKitProvider chains={chains} theme={selectedTheme}>
        <Component {...pageProps} />

        <div
          style={{
            fontFamily: 'sans-serif',
            paddingBottom: 200, // Allow the page to scroll on mobile
          }}
        >
          <h3>Theme</h3>
          <div
            style={{
              display: 'flex',
              gap: 24,
            }}
          >
            <div>
              <h4>Mode</h4>
              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={mode === 'light'}
                    name="mode"
                    onChange={handleModeChange}
                    type="radio"
                    value="light"
                  />{' '}
                  light
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={mode === 'dark'}
                    name="mode"
                    onChange={handleModeChange}
                    type="radio"
                    value="dark"
                  />{' '}
                  dark
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={mode === 'midnight'}
                    name="mode"
                    onChange={handleModeChange}
                    type="radio"
                    value="midnight"
                  />{' '}
                  midnight
                </label>
              </div>
            </div>
            <div>
              <h4>Accent</h4>
              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={accent === 'blue'}
                    name="accent"
                    onChange={handleAccentChange}
                    type="radio"
                    value="blue"
                  />{' '}
                  blue
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={accent === 'purple'}
                    name="accent"
                    onChange={handleAccentChange}
                    type="radio"
                    value="purple"
                  />{' '}
                  purple
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={accent === 'pink'}
                    name="accent"
                    onChange={handleAccentChange}
                    type="radio"
                    value="pink"
                  />{' '}
                  pink
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={accent === 'green'}
                    name="accent"
                    onChange={handleAccentChange}
                    type="radio"
                    value="green"
                  />{' '}
                  green
                </label>
              </div>
            </div>
            <div>
              <h4>Border radius</h4>
              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={radii === 'large'}
                    name="radii"
                    onChange={handleRadiiChange}
                    type="radio"
                    value="large"
                  />{' '}
                  large
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={radii === 'medium'}
                    name="radii"
                    onChange={handleRadiiChange}
                    type="radio"
                    value="medium"
                  />{' '}
                  medium
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={radii === 'small'}
                    name="radii"
                    onChange={handleRadiiChange}
                    type="radio"
                    value="small"
                  />{' '}
                  small
                </label>
                <label style={{ userSelect: 'none' }}>
                  <input
                    checked={radii === 'none'}
                    name="radii"
                    onChange={handleRadiiChange}
                    type="radio"
                    value="none"
                  />{' '}
                  none
                </label>
              </div>
            </div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
