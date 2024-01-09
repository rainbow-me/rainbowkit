import type { CreateConnectorFn } from 'wagmi';
import type { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
import { mewWallet } from './walletConnectors';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export const getDefaultWallets = ({
  appName,
  projectId,
}: {
  appName: string;
  projectId: string;
}): {
  connectors: CreateConnectorFn[];
  walletList: WalletList;
} => {
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

  return {
    connectors: connectorsForWallets({
      projectId,
      appName,
      walletList,
    }),
    walletList,
  };
};
