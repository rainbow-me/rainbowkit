import {
  connectorsForWallets,
  getDefaultWallets,
  wallet,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider({ apiKey: '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC' }),
    publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'rainbowkit.com',
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'More',
    wallets: [
      wallet.argent({ chains }),
      wallet.trust({ chains }),
      wallet.steak({ chains }),
      wallet.imToken({ chains }),
      wallet.ledger({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Provider({ children }) {
  return <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>;
}
