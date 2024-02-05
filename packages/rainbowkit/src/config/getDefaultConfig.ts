import { Transport } from 'viem';
import { http, CreateConfigParameters } from 'wagmi';
import { WagmiProviderProps, createConfig } from 'wagmi';
import { type RainbowKitChain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import type { WalletList } from '../wallets/Wallet';
import { computeWalletConnectMetaData } from '../wallets/computeWalletConnectMetaData';
import { connectorsForWallets } from '../wallets/connectorsForWallets';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '../wallets/walletConnectors';

export type _chains = readonly [RainbowKitChain, ...RainbowKitChain[]];

// Define the '_transports' type as a Record
// It maps each 'Chain' id to a 'Transport'
export type _transports = Record<_chains[number]['id'], Transport>;

type WagmiConfigParameters = Omit<
  CreateConfigParameters<_chains, _transports>,
  // If you use 'client' you can't use 'transports' (we force to use 'transports')
  // More info here https://wagmi.sh/core/api/createConfig#client
  // We will also use our own 'connectors' instead of letting user specifying it
  'client' | 'connectors'
>;

interface GetDefaultConfigParameters extends WagmiConfigParameters {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
  wallets?: WalletList;
  projectId: string;
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
  wallets,
  projectId,
  ...wagmiParameters
}: GetDefaultConfigParameters): WagmiProviderProps['config'] => {
  let { transports, chains, ...restWagmiParameters } = wagmiParameters;

  const metadata = computeWalletConnectMetaData({
    appName,
    appDescription,
    appUrl,
    appIcon,
  });

  const connectors = connectorsForWallets(
    wallets || [
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
    {
      projectId,
      appName,
      appDescription,
      appUrl,
      appIcon,
      walletConnectParameters: { metadata },
    },
  );

  if (!transports) {
    transports = createDefaultTransports(chains);
  }

  return createConfig({
    connectors,
    chains,
    transports,
    ...restWagmiParameters,
  });
};
