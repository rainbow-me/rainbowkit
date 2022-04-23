import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { chain, createClient, Provider as WagmiProvider } from 'wagmi';

const alchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';

const isChainSupported = (chainId?: number) =>
  chains.some(x => x.id === chainId);

const provider = ({ chainId }) =>
  new providers.AlchemyProvider(
    isChainSupported(chainId) ? chainId : chain.mainnet.id,
    alchemyId
  );

export const chains: Chain[] = [
  chain.mainnet,
  chain.polygon,
  chain.optimism,
  chain.arbitrum,
];

const wallets = getDefaultWallets({
  apiConfig: { alchemyId },
  appName: 'RainbowKit site',
  chains,
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
