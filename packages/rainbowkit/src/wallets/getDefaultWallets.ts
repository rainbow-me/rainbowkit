import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
import { brave } from './walletConnectors/brave/brave';
import { coinbase } from './walletConnectors/coinbase/coinbase';
import { injected } from './walletConnectors/injected/injected';
import { isMetaMask, metaMask } from './walletConnectors/metaMask/metaMask';
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
  const needsInjectedWalletFallback =
    typeof window !== 'undefined' &&
    window.ethereum &&
    !isMetaMask(window.ethereum) &&
    !window.ethereum.isCoinbaseWallet &&
    !window.ethereum.isBraveWallet;

  const wallets: WalletList = [
    {
      groupName: 'Popular',
      wallets: [
        rainbow({ chains }),
        coinbase({ appName, chains }),
        metaMask({ chains, shimDisconnect: true }),
        walletConnect({ chains }),
        brave({ chains, shimDisconnect: true }),
        ...(needsInjectedWalletFallback
          ? [injected({ chains, shimDisconnect: true })]
          : []),
      ],
    },
  ];

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
