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
}: RainbowConnectorOptions): CreateConnectorFn {
  const walletConnectParameters = {
    metadata: {
      name: appName,
      description: appDescription ?? appName,
      url:
        appUrl ?? (typeof window !== 'undefined' ? window.location.origin : ''),
      icons: [...(appIcon ? [appIcon] : [])],
    },
  };

  const [connector] = connectorsForWallets(
    [rainbowWallet({ projectId, walletConnectParameters })],
    {
      projectId,
      appName,
      appDescription,
      appUrl,
      appIcon,
    },
  );

  return connector;
}

export { rainbowConnector };
