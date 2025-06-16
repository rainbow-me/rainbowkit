import type { CreateConnectorFn } from 'wagmi';
import type { Wallet } from './Wallet';
import {
  type ConnectorsForWalletsParameters,
  connectorsForWallets,
} from './connectorsForWallets';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { safeWallet } from './walletConnectors/safeWallet/safeWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export function getDefaultWallets(parameters: ConnectorsForWalletsParameters): {
  connectors: CreateConnectorFn[];
  wallets: Wallet[];
};

export function getDefaultWallets(): { wallets: Wallet[] };

export function getDefaultWallets(parameters?: ConnectorsForWalletsParameters) {
  const params = parameters ?? {
    projectId: 'YOUR_PROJECT_ID',
    appName: 'RainbowKit',
    appDescription: undefined,
    appUrl: typeof window !== 'undefined' ? window.location.origin : '',
    appIcon: undefined,
  };

  const walletConnectParameters = {
    metadata: {
      name: params.appName,
      description: params.appDescription ?? params.appName,
      url:
        params.appUrl ??
        (typeof window !== 'undefined' ? window.location.origin : ''),
      icons: [...(params.appIcon ? [params.appIcon] : [])],
    },
  };

  const wallets: Wallet[] = [
    safeWallet(),
    rainbowWallet({
      projectId: params.projectId,
      walletConnectParameters,
    }),
    coinbaseWallet({
      appName: params.appName,
      appIcon: params.appIcon,
    }),
    metaMaskWallet({
      projectId: params.projectId,
      walletConnectParameters,
    }),
    walletConnectWallet({ projectId: params.projectId }),
  ];

  if (parameters) {
    return {
      connectors: connectorsForWallets(wallets, params),
      wallets,
    };
  }

  return {
    wallets,
  };
}
