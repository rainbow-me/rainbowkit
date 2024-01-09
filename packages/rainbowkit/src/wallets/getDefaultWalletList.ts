import type { WalletList } from './Wallet';
import { mewWallet } from './walletConnectors';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export const getDefaultWalletList = () => {
  const walletList: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        mewWallet,
        rainbowWallet,
        coinbaseWallet,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ];

  return walletList;
};
