import '@rainbow-me/rainbowkit/index.css';
import {
  chain,
  defaultL2Chains,
  RainbowKitProvider,
  WagmiProvider,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import type { AppProps } from 'next/app';
import React from 'react';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

const infuraId = '0c8c992691dc4bfe97b4365a27fb2ce4';

const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains = [chain.mainnet, ...defaultL2Chains];

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];

  return [
    new InjectedConnector({
      chains,
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
  return (
    <WagmiProvider autoConnect connectors={connectors} provider={provider}>
      <RainbowKitProvider>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
