import type { Wallet, WalletList } from './Wallet';
import {
  type ConnectorsForWalletsParameters,
  connectorsForWallets,
} from './connectorsForWallets';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export function getDefaultWallets(parameters: ConnectorsForWalletsParameters): {
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: Wallet[];
};

export function getDefaultWallets(): { wallets: Wallet[] };

export function getDefaultWallets(parameters?: ConnectorsForWalletsParameters):
  | { connectors: ReturnType<typeof connectorsForWallets>; wallets: Wallet[] }
  | {
      wallets: Wallet[];
    } {
  const wallets = [
    rainbowWallet,
    coinbaseWallet,
    metaMaskWallet,
    walletConnectWallet,
  ] as unknown as Wallet[];

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
