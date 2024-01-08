import { Transport } from 'viem';
import {
  CreateConfigParameters,
  WagmiProviderProps,
  createConfig,
} from 'wagmi';
import type { Chain } from 'wagmi/chains';
import type {
  RainbowKitWalletConnectParameters,
  WalletList,
} from '../wallets/Wallet';
import { connectorsForWallets } from '../wallets/connectorsForWallets';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '../wallets/walletConnectors';

type _chains = readonly [Chain, ...Chain[]];

// Define the '_transports' type as a Record
// It maps each 'Chain' id to a 'Transport'
type _transports = Record<_chains[number]['id'], Transport>;

interface GetDefaultConfigParameters {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  icons?: string[];
  appIcon?: string;
  chains: readonly [Chain, ...Chain[]];
  wallets?: WalletList;
  projectId: string;
  transports: _transports;
}

export const getDefaultConfig = ({
  appName,
  appDescription,
  appUrl,
  icons,
  appIcon,
  chains,
  wallets,
  projectId,
  ...wagmiOptions
}: GetDefaultConfigParameters &
  CreateConfigParameters<
    _chains,
    _transports
  >): WagmiProviderProps['config'] => {
  const metadata: RainbowKitWalletConnectParameters['metadata'] = {
    name: appName,
    description: appDescription ?? '',
    url: appUrl ?? '',
    icons: icons ?? [],
  };

  const connectors = connectorsForWallets(
    wallets || [
      {
        groupName: 'Popular',
        wallets: [
          rainbowWallet({
            projectId,
            walletConnectParameters: { metadata },
          }),
          coinbaseWallet({ appName, appIcon }),
          metaMaskWallet({
            projectId,
            walletConnectParameters: { metadata },
          }),
          walletConnectWallet({ projectId, options: { metadata } }),
        ],
      },
    ],
  );

  return createConfig({
    chains,
    connectors,
    ...wagmiOptions,
  });
};
