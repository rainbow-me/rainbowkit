/* eslint-disable react/no-danger */
import '@rainbow-me/rainbowkit/styles.css';
import { Chain, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import type { AppProps } from 'next/app';
import React from 'react';
import { chain, Provider as WagmiProvider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import '../css/global.css';

const infuraId = '0c8c992691dc4bfe97b4365a27fb2ce4';

const provider = ({ chainId }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
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
  return (
    <>
      <WagmiProvider autoConnect connectors={connectors} provider={provider}>
        <RainbowKitProvider chains={chains} theme={darkTheme}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiProvider>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@font-face {
  font-family: 'SFRounded';
  src: url('/fonts/subset-SFRounded-Regular.eot');
  src: url('/fonts/subset-SFRounded-Regular.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/subset-SFRounded-Regular.woff2') format('woff2'),
    url('/fonts/subset-SFRounded-Regular.woff') format('woff'),
    url('/fonts/subset-SFRounded-Regular.svg#SFRounded-Regular') format('svg');
  font-weight: 400;
  font-style: normal;
  font-display: auto;
}

@font-face {
  font-family: 'SFRounded';
  src: url('/fonts/subset-SFRounded-Medium.eot');
  src: url('/fonts/subset-SFRounded-Medium.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/subset-SFRounded-Medium.woff2') format('woff2'),
    url('/fonts/subset-SFRounded-Medium.woff') format('woff'),
    url('/fonts/subset-SFRounded-Medium.svg#SFRounded-Medium') format('svg');
  font-weight: 500;
  font-style: normal;
  font-display: auto;
}

@font-face {
  font-family: 'SFRounded';
  src: url('/fonts/subset-SFRounded-Semibold.eot');
  src: url('/fonts/subset-SFRounded-Semibold.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/subset-SFRounded-Semibold.woff2') format('woff2'),
    url('/fonts/subset-SFRounded-Semibold.woff') format('woff'),
    url('/fonts/subset-SFRounded-Semibold.svg#SFRounded-Semibold') format('svg');
  font-weight: 600;
  font-style: normal;
  font-display: auto;
}

@font-face {
  font-family: 'SFRounded';
  src: url('/fonts/subset-SFRounded-Bold.eot');
  src: url('/fonts/subset-SFRounded-Bold.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/subset-SFRounded-Bold.woff2') format('woff2'),
    url('/fonts/subset-SFRounded-Bold.woff') format('woff'),
    url('/fonts/subset-SFRounded-Bold.svg#SFRounded-Bold') format('svg');
  font-weight: 700;
  font-style: normal;
  font-display: auto;
}

@font-face {
  font-family: 'SFRounded';
  src: url('/fonts/subset-SFRounded-Heavy.eot');
  src: url('/fonts/subset-SFRounded-Heavy.eot?#iefix')
      format('embedded-opentype'),
    url('/fonts/subset-SFRounded-Heavy.woff2') format('woff2'),
    url('/fonts/subset-SFRounded-Heavy.woff') format('woff'),
    url('/fonts/subset-SFRounded-Heavy.svg#SFRounded-Heavy') format('svg');
  font-weight: 800;
  font-style: normal;
  font-display: auto;
}
`,
        }}
      />
    </>
  );
}

export default App;
