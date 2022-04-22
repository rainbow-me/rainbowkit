import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { providers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { chain, createClient, Provider as WagmiProvider } from 'wagmi';

export const infuraId = '0c8c992691dc4bfe97b4365a27fb2ce4';

const isChainSupported = (chainId?: number) =>
  chains.some(x => x.id === chainId);

const provider = ({ chainId }) =>
  new providers.InfuraProvider(
    isChainSupported(chainId) ? chainId : chain.mainnet.id,
    infuraId
  );

export const chains: Chain[] = [
  { ...chain.mainnet, name: 'Ethereum' },
  { ...chain.polygon, name: 'Polygon' },
  { ...chain.optimism, name: 'Optimism' },
  { ...chain.arbitrum, name: 'Arbitrum' },
];

const wallets = getDefaultWallets({
  appName: 'RainbowKit site',
  chains,
  infuraId,
  jsonRpcUrl: ({ chainId }) =>
    `${
      chains.find(x => x.id === chainId)?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0]
    }/${infuraId}`,
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
