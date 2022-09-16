import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
import { brave } from './walletConnectors/brave/brave';
import { coinbase } from './walletConnectors/coinbase/coinbase';
import { injected } from './walletConnectors/injected/injected';
import { metaMask } from './walletConnectors/metaMask/metaMask';
import { rainbow } from './walletConnectors/rainbow/rainbow';
import { walletConnect } from './walletConnectors/walletConnect/walletConnect';

export const getDefaultWallets = ({
  appName,
  chains,
}: {
  appName: string;
  chains: Chain[];
}): {
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} => {
  const wallets: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        injected({ chains }),
        rainbow({ chains }),
        coinbase({ appName, chains }),
        metaMask({ chains }),
        walletConnect({ chains }),
        brave({ chains }),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
