import './global.css';
import '@rainbow-me/rainbowkit/styles.css';
import {
  apiProvider,
  configureChains,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
  wallet,
} from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { chain, createClient, WagmiProvider } from 'wagmi';

const alchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [apiProvider.alchemy(alchemyId), apiProvider.fallback()]
);

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.imToken({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

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
  'custom',
] as const;
type AccentColor = typeof accentColors[number];

const radiusScales = ['large', 'medium', 'small', 'none'] as const;
type RadiusScale = typeof radiusScales[number];

function App({ Component, pageProps }: AppProps) {
  const [selectedThemeName, setThemeName] = useState<ThemeName>('light');
  const [selectedFontStack, setFontStack] = useState<FontStack>('rounded');
  const [selectedAccentColor, setAccentColor] = useState<AccentColor>('blue');
  const [selectedRadiusScale, setRadiusScale] = useState<RadiusScale>('large');
  const [showRecentTransactions, setShowRecentTransactions] = useState(true);
  const [coolModeEnabled, setCoolModeEnabled] = useState(false);

  const currentTheme = (
    themes.find(({ name }) => name === selectedThemeName) ?? themes[0]
  ).theme;

  const accentColor =
    selectedAccentColor === 'custom'
      ? { accentColor: 'red', accentColorForeground: 'yellow' } // https://blog.codinghorror.com/a-tribute-to-the-windows-31-hot-dog-stand-color-scheme
      : currentTheme.accentColors[selectedAccentColor];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <>
      <Head>
        <title>RainbowKit Example</title>
      </Head>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider
          appInfo={demoAppInfo}
          chains={chains}
          coolMode={coolModeEnabled}
          showRecentTransactions={showRecentTransactions}
          theme={currentTheme({
            ...accentColor,
            borderRadius: selectedRadiusScale,
            fontStack: selectedFontStack,
          })}
        >
          <div style={{ padding: 8 }}>
            <Component {...pageProps} />

            {isMounted && (
              <>
                <div
                  style={{
                    fontFamily: 'sans-serif',
                  }}
                >
                  <h3>RainbowKitProvider props</h3>
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
                        checked={showRecentTransactions}
                        name="showRecentTransactions"
                        onChange={e =>
                          setShowRecentTransactions(e.target.checked)
                        }
                        type="checkbox"
                      />{' '}
                      showRecentTransactions
                    </label>
                    <label style={{ userSelect: 'none' }}>
                      <input
                        checked={coolModeEnabled}
                        name="coolMode"
                        onChange={e => setCoolModeEnabled(e.target.checked)}
                        type="checkbox"
                      />{' '}
                      coolMode
                    </label>
                  </div>
                </div>
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
                              onChange={e =>
                                setThemeName(e.target.value as ThemeName)
                              }
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
                              onChange={e =>
                                setFontStack(e.target.value as FontStack)
                              }
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
                          <label
                            key={accentColor}
                            style={{ userSelect: 'none' }}
                          >
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
                          <label
                            key={radiusScale}
                            style={{ userSelect: 'none' }}
                          >
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
              </>
            )}
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
