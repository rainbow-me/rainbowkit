import type { CreateConnectorFn } from 'wagmi';
import type { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
import { braveWallet } from './walletConnectors/braveWallet/braveWallet';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { safeWallet } from './walletConnectors/safeWallet/safeWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export const getDefaultWallets = ({
  appName,
  projectId,
}: {
  appName: string;
  projectId: string;
}): {
  connectors: CreateConnectorFn[];
  wallets: WalletList;
} => {
  const wallets: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        safeWallet(),
        rainbowWallet({ projectId }),
        coinbaseWallet({ appName }),
        metaMaskWallet({ projectId }),
        walletConnectWallet({ projectId }),
        braveWallet(),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
