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

const { wallets } = getDefaultWallets();

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
    {
      groupName: 'More',
      wallets: [
        argentWallet,
        trustWallet,
        omniWallet,
        imTokenWallet,
        ledgerWallet,
      ],
    },
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
