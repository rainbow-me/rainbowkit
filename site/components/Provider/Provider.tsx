import {
  apiProvider,
  configureChains,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { chain, createClient, Provider as WagmiProvider } from 'wagmi';

const alchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [apiProvider.alchemy(alchemyId), apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit site',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Provider({ children }) {
  return <WagmiProvider client={wagmiClient}>{children}</WagmiProvider>;
}
