import type { CreateConnectorFn } from 'wagmi';
import type { WalletList } from './Wallet';
import {
  ConnectorsForWalletsParameters,
  connectorsForWallets,
} from './connectorsForWallets';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export function getDefaultWallets(parameters: ConnectorsForWalletsParameters): {
  connectors: CreateConnectorFn[];
  walletList: WalletList;
};

export function getDefaultWallets(): { walletList: WalletList };

export function getDefaultWallets(parameters?: ConnectorsForWalletsParameters) {
  const walletList: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        rainbowWallet,
        coinbaseWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ];

  if (parameters) {
    return {
      connectors: connectorsForWallets(walletList, parameters),
      walletList,
    };
  }

  return {
    walletList,
  };
}
