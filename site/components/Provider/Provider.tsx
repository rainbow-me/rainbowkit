import {
  apiProvider,
  configureChains,
  connectorsForWallets,
  getDefaultWallets,
  wallet,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { chain, createClient, Provider as WagmiProvider } from 'wagmi';

const alchemyId = '_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC';

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [apiProvider.alchemy(alchemyId), apiProvider.fallback()]
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
  return <WagmiProvider client={wagmiClient}>{children}</WagmiProvider>;
}
