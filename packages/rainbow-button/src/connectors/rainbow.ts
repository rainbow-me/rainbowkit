import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import type { CreateConnectorFn } from 'wagmi';

export type RainbowConnectorOptions = Parameters<typeof rainbowWallet>[0] & {
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
};

function rainbowConnector({
  projectId,
  appName,
  appDescription,
  appUrl,
  appIcon,
  walletConnectParameters,
}: RainbowConnectorOptions): CreateConnectorFn {
  const [connector] = connectorsForWallets(
    [{ groupName: 'Popular', wallets: [rainbowWallet] }],
    {
      projectId,
      appName,
      appDescription,
      appUrl,
      appIcon,
      walletConnectParameters,
    },
  );

  return connector;
}

export { rainbowConnector };
