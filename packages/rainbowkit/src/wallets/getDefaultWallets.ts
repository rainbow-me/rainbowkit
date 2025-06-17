import type { CreateConnectorFn } from 'wagmi';
import type { Wallet, DefaultWalletOptions } from './Wallet';
import type { CoinbaseWalletOptions } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import {
  type ConnectorsForWalletsParameters,
  connectorsForWallets,
} from './connectorsForWallets';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export function getDefaultWallets(parameters: ConnectorsForWalletsParameters): {
  connectors: CreateConnectorFn[];
  wallets: ((
    createWalletParams: CoinbaseWalletOptions & DefaultWalletOptions,
  ) => Wallet)[];
};

export function getDefaultWallets(): {
  wallets: ((
    createWalletParams: CoinbaseWalletOptions & DefaultWalletOptions,
  ) => Wallet)[];
};

export function getDefaultWallets(parameters?: ConnectorsForWalletsParameters):
  | {
      connectors: CreateConnectorFn[];
      wallets: ((
        createWalletParams: CoinbaseWalletOptions & DefaultWalletOptions,
      ) => Wallet)[];
    }
  | {
      wallets: ((
        createWalletParams: CoinbaseWalletOptions & DefaultWalletOptions,
      ) => Wallet)[];
    } {
  const wallets: ((
    createWalletParams: CoinbaseWalletOptions & DefaultWalletOptions,
  ) => Wallet)[] = [
    rainbowWallet,
    coinbaseWallet,
    metaMaskWallet,
    walletConnectWallet,
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
