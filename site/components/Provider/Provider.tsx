import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
  rpcProvider,
} from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { chain, createClient, Provider as WagmiProvider } from 'wagmi';

const alchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';

export const chains: Chain[] = [
  chain.mainnet,
  chain.polygon,
  chain.optimism,
  chain.arbitrum,
];

const { provider, rpcUrls } = rpcProvider.alchemy(alchemyId, { chains });

const wallets = getDefaultWallets({
  appName: 'RainbowKit site',
  chains,
  rpcUrls,
});

const connectors = connectorsForWallets(wallets);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Provider({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;
  return <WagmiProvider client={wagmiClient}>{children}</WagmiProvider>;
}
