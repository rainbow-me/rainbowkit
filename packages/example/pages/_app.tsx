import '@rainbow-me/rainbowkit/styles.css';
import {
  Chain,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
  wallet,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import { chain, WagmiProvider } from 'wagmi';

const infuraId = '0c8c992691dc4bfe97b4365a27fb2ce4';

const isChainSupported = (chainId?: number) =>
  chains.some(x => x.id === chainId);

const provider = ({ chainId }: { chainId?: number }) =>
  new providers.InfuraProvider(
    isChainSupported(chainId) ? chainId : chain.mainnet.id,
    infuraId
  );

const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimism, name: 'Optimism' },
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

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      wallet.argent({ chains, infuraId }),
      wallet.trust({ chains, infuraId }),
    ],
  },
]);

const themes = [
  { name: 'light', theme: lightTheme },
  { name: 'dark', theme: darkTheme },
  { name: 'midnight', theme: midnightTheme },
] as const;
type ThemeName = typeof themes[number]['name'];

const fontStacks = ['rounded', 'system'] as const;
type FontStack = typeof fontStacks[number];

const accentColors = [
  'blue',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'yellow',
] as const;
type AccentColor = typeof accentColors[number];

const radiusScales = ['large', 'medium', 'small', 'none'] as const;
type RadiusScale = typeof radiusScales[number];

function App({ Component, pageProps }: AppProps) {
  const [selectedThemeName, setThemeName] = useState<ThemeName>('light');
  const [selectedFontStack, setFontStack] = useState<FontStack>('rounded');
  const [selectedAccentColor, setAccentColor] = useState<AccentColor>('blue');
  const [selectedRadiusScale, setRadiusScale] = useState<RadiusScale>('large');

  const selectedTheme = themes
    .find(({ name }) => name === selectedThemeName)
    ?.theme({
      accentColor: selectedAccentColor,
      borderRadius: selectedRadiusScale,
      fontStack: selectedFontStack,
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
          <div
            style={{
              display: 'flex',
              gap: 24,
            }}
          >
            <div>
              <h4>Theme</h4>
              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {themes.map(({ name: themeName }) => (
                  <label key={themeName} style={{ userSelect: 'none' }}>
                    <input
                      checked={themeName === selectedThemeName}
                      name="theme"
                      onChange={e => setThemeName(e.target.value as ThemeName)}
                      type="radio"
                      value={themeName}
                    />{' '}
                    {themeName}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4>Font stack</h4>
              <div
                style={{
                  alignItems: 'flex-start',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                {fontStacks.map(fontStack => (
                  <label key={fontStack} style={{ userSelect: 'none' }}>
                    <input
                      checked={fontStack === selectedFontStack}
                      name="fontStack"
                      onChange={e => setFontStack(e.target.value as FontStack)}
                      type="radio"
                      value={fontStack}
                    />{' '}
                    {fontStack}
                  </label>
                ))}
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
                {accentColors.map(accentColor => (
                  <label key={accentColor} style={{ userSelect: 'none' }}>
                    <input
                      checked={accentColor === selectedAccentColor}
                      name="accentColor"
                      onChange={e =>
                        setAccentColor(e.target.value as AccentColor)
                      }
                      type="radio"
                      value={accentColor}
                    />{' '}
                    {accentColor}
                  </label>
                ))}
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
                {radiusScales.map(radiusScale => (
                  <label key={radiusScale} style={{ userSelect: 'none' }}>
                    <input
                      checked={radiusScale === selectedRadiusScale}
                      name="radiusScale"
                      onChange={e =>
                        setRadiusScale(e.target.value as RadiusScale)
                      }
                      type="radio"
                      value={radiusScale}
                    />{' '}
                    {radiusScale}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
