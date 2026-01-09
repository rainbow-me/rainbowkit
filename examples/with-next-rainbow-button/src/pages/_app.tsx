import '../styles/global.css';
import '@rainbow-me/rainbow-button/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowButtonProvider } from '@rainbow-me/rainbow-button';

import { config } from '../wagmi';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.pathname === '/404' || router.pathname === '/500') {
    return <Component {...pageProps} />;
  }

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
