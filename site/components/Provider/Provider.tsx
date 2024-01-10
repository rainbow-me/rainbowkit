import { getDefaultConfig, getDefaultWalletList } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  imTokenWallet,
  ledgerWallet,
  omniWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const walletList = getDefaultWalletList();

const config = getDefaultConfig({
  appName: 'rainbowkit.com',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, zora, bsc],
  walletList: [
    ...walletList,
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
});

const client = new QueryClient();

export function Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
