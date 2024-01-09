import { Transport } from 'viem';
import { http } from 'wagmi';
import { WagmiProviderProps, createConfig } from 'wagmi';
import { type Chain } from 'wagmi/chains';
import type { WalletList } from '../wallets/Wallet';
import { computeWalletConnectMetaData } from '../wallets/computeWalletConnectMetaData';
import { connectorsForWallets } from '../wallets/connectorsForWallets';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '../wallets/walletConnectors';

export type _chains = readonly [Chain, ...Chain[]];

// Define the '_transports' type as a Record
// It maps each 'Chain' id to a 'Transport'
export type _transports = Record<_chains[number]['id'], Transport>;

interface GetDefaultConfigParameters {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
  walletList?: WalletList;
  projectId: string;
  chains: _chains;
  transports?: _transports;
  multiInjectedProviderDiscovery?: boolean;
}

const createDefaultTransports = (chains: _chains): _transports => {
  const transportsObject = chains.reduce((acc: _transports, chain) => {
    const key = chain.id as keyof _transports;
    acc[key] = http() as _transports[keyof _transports]; // Type assertion here
    return acc;
  }, {} as _transports);

  return transportsObject;
};

export const getDefaultConfig = ({
  appName,
  appDescription,
  appUrl,
  appIcon,
  walletList,
  projectId,
  chains,
  multiInjectedProviderDiscovery = true,
  transports,
}: GetDefaultConfigParameters): WagmiProviderProps['config'] => {
  const metadata = computeWalletConnectMetaData({
    appName,
    appDescription,
    appUrl,
    appIcon,
  });

  const connectors = connectorsForWallets({
    projectId,
    walletList: walletList || [
      {
        groupName: 'Popular',
        wallets: [
          rainbowWallet,
          coinbaseWallet,
          metaMaskWallet,
          walletConnectWallet,
        ],
      },
    ],
    appName,
    appDescription,
    appUrl,
    appIcon,
    walletConnectParameters: { metadata },
  });

  if (!transports) {
    transports = createDefaultTransports(chains);
  }

  return createConfig({
    connectors,
    chains,
    transports,
    multiInjectedProviderDiscovery,
  });
};
