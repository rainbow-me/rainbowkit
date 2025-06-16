import type { Transport } from 'viem';
import { http, type CreateConfigParameters } from 'wagmi';
import { createConfig } from 'wagmi';
import type { RainbowKitChain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import type { Wallet } from '../wallets/Wallet';
import { connectorsForWallets } from '../wallets/connectorsForWallets';
import { getDefaultWallets } from '../wallets/getDefaultWallets';

export type _chains = readonly [RainbowKitChain, ...RainbowKitChain[]];

// Define the '_transports' type as a Record
// It maps each 'Chain' id to a 'Transport'
export type _transports = Record<_chains[number]['id'], Transport>;

interface GetDefaultConfigParameters<
  chains extends _chains,
  transports extends _transports,
> extends Omit<
    CreateConfigParameters<chains, transports>,
    // If you use 'client' you can't use 'transports' (we force to use 'transports')
    // More info here https://wagmi.sh/core/api/createConfig#client
    // We will also use our own 'connectors' instead of letting user specifying it
    'client' | 'connectors'
  > {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
  wallets?: Wallet[];
  projectId: string;
}

const createDefaultTransports = <
  chains extends _chains,
  transports extends _transports,
>(
  chains: chains,
): transports => {
  const transportsObject = chains.reduce((acc: transports, chain) => {
    const key = chain.id as keyof transports;
    acc[key] = http() as transports[keyof transports]; // Type assertion here
    return acc;
  }, {} as transports);

  return transportsObject;
};

export const getDefaultConfig = <
  chains extends _chains,
  transports extends _transports,
>({
  appName,
  appDescription,
  appUrl,
  appIcon,
  wallets,
  projectId,
  ...wagmiParameters
}: GetDefaultConfigParameters<chains, transports>) => {
  const { transports, chains, ...restWagmiParameters } = wagmiParameters;

  const defaultWallets = getDefaultWallets({
    projectId,
    appName,
    appDescription,
    appUrl,
    appIcon,
  }).wallets;

  const connectors = connectorsForWallets(wallets || defaultWallets, {
    projectId,
    appName,
    appDescription,
    appUrl,
    appIcon,
  });

  return createConfig({
    connectors,
    chains,
    transports:
      transports || createDefaultTransports<chains, transports>(chains),
    ...restWagmiParameters,
  });
};
