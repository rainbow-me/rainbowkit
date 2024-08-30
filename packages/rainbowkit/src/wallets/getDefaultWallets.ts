import type { CreateConnectorFn } from 'wagmi';
import type { WalletList } from './Wallet';
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
  wallets: WalletList;
};

export function getDefaultWallets(): { wallets: WalletList };

export function getDefaultWallets(parameters?: ConnectorsForWalletsParameters) {
  const wallets: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        safeWallet,
        rainbowWallet,
        coinbaseWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ];

  if (parameters) {
    return {
      connectors: connectorsForWallets(wallets, parameters),
      wallets,
    };
  }

  return {
    wallets,
  };
}
