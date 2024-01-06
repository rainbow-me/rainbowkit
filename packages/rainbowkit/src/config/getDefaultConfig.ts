import { type Chain, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import type { WalletList } from '../wallets/Wallet';
import { connectorsForWallets } from '../wallets/connectorsForWallets';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '../wallets/walletConnectors';

export const getDefaultConfig = ({
  appName,
  appIcon,
  chains,
  wallets,
  projectId,
}: {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
  chains: Chain[];
  wallets?: WalletList;
  projectId: string;
}) => {
  const { publicClient, webSocketPublicClient } = configureChains(chains, [
    publicProvider(),
  ]);

  const connectors = connectorsForWallets(
    wallets || [
      {
        groupName: 'Popular',
        wallets: [
          rainbowWallet({ chains, projectId }),
          coinbaseWallet({ appName, appIcon, chains }),
          metaMaskWallet({ chains, projectId }),
          walletConnectWallet({ chains, projectId }),
        ],
      },
    ],
  );

  return createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });
};
