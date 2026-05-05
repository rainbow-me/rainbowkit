import '../styles/global.css';
import '@rainbow-me/rainbow-button/styles.css';
import { RainbowButtonProvider } from '@rainbow-me/rainbow-button';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';

import { config } from '../wagmi';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowButtonProvider>
          <Component {...pageProps} />
        </RainbowButtonProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
