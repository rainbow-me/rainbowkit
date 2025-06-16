import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  imTokenWallet,
  ledgerWallet,
  omniWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type React from 'react';
import { http, WagmiProvider } from 'wagmi';
import {
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const transports = {
  [mainnet.id]: http(),
  [polygon.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [base.id]: http(),
  [bsc.id]: http(),
  [avalanche.id]: http(),
  [zora.id]: http(),
  [blast.id]: http(),
};

const walletConnectParameters = {
  metadata: {
    name: 'rainbowkit.com',
    description: 'rainbowkit.com',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    icons: [],
  },
};

const { wallets } = getDefaultWallets({
  projectId,
  appName: 'rainbowkit.com',
  appDescription: 'rainbowkit.com',
});

const config = getDefaultConfig({
  appName: 'rainbowkit.com',
  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    avalanche,
    zora,
    blast,
  ],
  transports,
  wallets: [
    ...wallets,
    argentWallet({ projectId, walletConnectParameters }),
    trustWallet({ projectId, walletConnectParameters }),
    omniWallet({ projectId, walletConnectParameters }),
    imTokenWallet({ projectId, walletConnectParameters }),
    ledgerWallet({ projectId, walletConnectParameters }),
  ],
  ssr: true,
});

const client = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
