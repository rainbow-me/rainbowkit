import { type Chain, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import type { WalletList } from '../wallets/Wallet';
import { connectorsForWallets } from '../wallets/connectorsForWallets';
import type { WalletConnectConnectorMetadata } from '../wallets/getWalletConnectConnector';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '../wallets/walletConnectors';

export const getDefaultConfig = ({
  appName,
  appDescription,
  appUrl,
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

  const metadata: WalletConnectConnectorMetadata = {
    name: appName,
    description: appDescription,
    url: appUrl,
  };

  const connectors = connectorsForWallets(
    wallets || [
      {
        groupName: 'Popular',
        wallets: [
          rainbowWallet({
            chains,
            projectId,
            walletConnectOptions: { metadata },
          }),
          coinbaseWallet({ appName, appIcon, chains }),
          metaMaskWallet({
            chains,
            projectId,
            walletConnectOptions: { metadata },
          }),
          walletConnectWallet({ chains, projectId, options: { metadata } }),
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
