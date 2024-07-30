import { WalletInstance } from './Wallet';

export const groupedWallets = (
  recentWallets: WalletInstance[],
  walletInstances: WalletInstance[],
) => {
  return [
    ...recentWallets,
    ...walletInstances.filter(
      (walletInstance) =>
        !recentWallets.some((wallet) => wallet.id === walletInstance.id),
    ),
  ];
};

export const isRecentWallet = (
  recentWallets: WalletInstance[],
  walletId: string,
) => {
  return recentWallets.some((recentWallet) => recentWallet.id === walletId);
};

export const isRainbowKitConnector = (wallet: WalletInstance) => {
  return !!wallet.isRainbowKitConnector;
};

export const isEIP6963Connector = (wallet: WalletInstance) => {
  return !!(
    !wallet.isRainbowKitConnector &&
    wallet.icon?.replace(/\n/g, '').startsWith('data:image') &&
    wallet.uid &&
    wallet.name
  );
};

interface ConnectorsWithWalletsParams {
  wallets: WalletInstance[];
  recentWallets: WalletInstance[];
}

export const connectorsWithRecentWallets = ({
  wallets,
  recentWallets,
}: ConnectorsWithWalletsParams) => {
  return [
    ...recentWallets,
    ...wallets.filter((wallet) => !isRecentWallet(recentWallets, wallet.id)),
  ];
};
