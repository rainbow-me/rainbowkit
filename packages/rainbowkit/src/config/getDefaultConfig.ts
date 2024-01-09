import { Transport } from 'viem';
import {
  CreateConfigParameters,
  WagmiProviderProps,
  createConfig,
} from 'wagmi';
import type { Chain } from 'wagmi/chains';
import type { WalletList } from '../wallets/Wallet';
import { computeWalletConnectMetaData } from '../wallets/computeWalletConnectMetaData';
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
  appIcon?: string;
  chains: readonly [Chain, ...Chain[]];
  walletList?: WalletList;
  projectId: string;
  transports: _transports;
}

export const getDefaultConfig = ({
  appName,
  appDescription,
  appUrl,
  appIcon,
  chains,
  walletList,
  projectId,
  ...wagmiOptions
}: GetDefaultConfigParameters &
  CreateConfigParameters<
    _chains,
    _transports
  >): WagmiProviderProps['config'] => {
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

  return createConfig({
    chains,
    connectors,
    ...wagmiOptions,
  });
};
