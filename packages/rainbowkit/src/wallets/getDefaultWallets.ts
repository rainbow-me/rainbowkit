import type { Connector } from 'wagmi';
import type { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import type { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { walletConnectWallet } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export const getDefaultWallets = ({
  appName,
  chains,
  projectId,
}: {
  appName: string;
  projectId: string;
  chains: Chain[];
}): {
  connectors: () => Connector[];
  wallets: WalletList;
} => {
  const wallets: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        rainbowWallet({ chains, projectId }),
        coinbaseWallet({ appName, chains }),
        metaMaskWallet({ chains, projectId }),
        walletConnectWallet({ chains, projectId }),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
