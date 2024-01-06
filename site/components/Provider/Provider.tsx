import { getDefaultConfig, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  imTokenWallet,
  ledgerWallet,
  omniWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import React from 'react';
import { WagmiConfig } from 'wagmi';
import {
  arbitrum,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';

export const chains = [mainnet, polygon, optimism, arbitrum, base, zora, bsc];

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID';

const { wallets } = getDefaultWallets({
  appName: 'rainbowkit.com',
  projectId,
  chains,
});

const wagmiConfig = getDefaultConfig({
  appName: 'rainbowkit.com',
  projectId,
  chains,
  wallets: [
    ...wallets,
    {
      groupName: 'More',
      wallets: [
        argentWallet({ chains, projectId }),
        trustWallet({ chains, projectId }),
        omniWallet({ chains, projectId }),
        imTokenWallet({ chains, projectId }),
        ledgerWallet({ chains, projectId }),
      ],
    },
  ],
});

export function Provider({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
