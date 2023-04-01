import '../styles/global.css';
import '@rainbow-me/button/styles.css';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { RainbowButtonProvider, RainbowConnector } from '@rainbow-me/button';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new RainbowConnector({ chains })],
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowButtonProvider>
        <Component {...pageProps} />
      </RainbowButtonProvider>
    </WagmiConfig>
  );
}

export default MyApp;
