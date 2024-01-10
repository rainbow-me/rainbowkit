import type { WalletList } from './Wallet';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export const getDefaultWalletList = () => {
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

  return walletList;
};
