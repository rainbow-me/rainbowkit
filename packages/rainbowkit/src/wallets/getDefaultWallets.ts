import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
import { braveWallet } from './walletConnectors/braveWallet/braveWallet';
import { coinbaseWallet } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import { injectedWallet } from './walletConnectors/injectedWallet/injectedWallet';
import { metaMaskWallet } from './walletConnectors/metaMaskWallet/metaMaskWallet';
import { rainbowWallet } from './walletConnectors/rainbowWallet/rainbowWallet';
import { safeWallet } from './walletConnectors/safeWallet/safeWallet';
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
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} => {
  const wallets: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet({ chains }),
        safeWallet({ chains }),
        rainbowWallet({ chains, projectId }),
        coinbaseWallet({ appName, chains }),
        metaMaskWallet({ chains, projectId }),
        walletConnectWallet({ chains, projectId }),
        braveWallet({ chains }),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
