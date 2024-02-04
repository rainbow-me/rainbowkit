import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { rainbowWallet } from '@rainbow-me/rainbowkit/wallets';
import type { CreateConnectorFn } from 'wagmi';
import { injected } from 'wagmi/connectors';

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

  // We don't return connectors on SSR. This is because we avoid getting memory leaks
  // with WalletConnect and unexpected errors with coinbaseWallet if provided.
  // Adding injected connector as a fallback here
  return connector ?? injected();
}

export { rainbowConnector };
