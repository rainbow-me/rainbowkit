import '@rainbow-me/rainbowkit/styles.css';
import {
  Chain,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import type { AppProps } from 'next/app';
import React, { useCallback, useState } from 'react';
import { chain, WagmiProvider } from 'wagmi';

const infuraId = '0c8c992691dc4bfe97b4365a27fb2ce4';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

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

function App({ Component, pageProps }: AppProps) {
  const [selectedTheme, setSelectedTheme] = useState(LIGHT_THEME);
  const isLightTheme = selectedTheme === LIGHT_THEME;
  const toggleTheme = useCallback(() => {
    setSelectedTheme(isLightTheme ? DARK_THEME : LIGHT_THEME);
  }, [isLightTheme]);
  const theme = isLightTheme ? lightTheme : darkTheme;
  return (
    <WagmiProvider autoConnect connectors={connectors} provider={provider}>
      <RainbowKitProvider chains={chains} theme={theme}>
        <Component {...pageProps} />

        <h3 style={{ fontFamily: 'sans-serif' }}>Theme</h3>
        <button onClick={toggleTheme} type="button">
          {selectedTheme}
        </button>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
