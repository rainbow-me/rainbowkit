import '@rainbow-me/rainbowkit/index.css';
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import type { AppProps } from 'next/app';
import React, { useCallback, useState } from 'react';
import { chain, Provider as WagmiProvider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

const infuraId = '0c8c992691dc4bfe97b4365a27fb2ce4';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygonMainnet, name: 'Polygon' },
  { ...chain.optimisticEthereum, name: 'Optimism' },
  { ...chain.arbitrumOne, name: 'Arbitrum' },
];

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];

  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: 'RainbowKit demo',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

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
        <button onClick={toggleTheme} type="button">
          {selectedTheme}
        </button>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
