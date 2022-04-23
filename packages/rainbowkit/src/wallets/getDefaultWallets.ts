import { WalletConfig, WalletList } from './Wallet';
import { coinbase } from './walletConnectors/coinbase/coinbase';
import { injected } from './walletConnectors/injected/injected';
import { metaMask } from './walletConnectors/metaMask/metaMask';
import { rainbow } from './walletConnectors/rainbow/rainbow';
import { walletConnect } from './walletConnectors/walletConnect/walletConnect';

export const getDefaultWallets = ({
  apiConfig,
  appName,
  chains,
}: WalletConfig): WalletList => {
  const needsInjectedWalletFallback =
    typeof window !== 'undefined' &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

  return [
    {
      groupName: 'Popular',
      wallets: [
        rainbow({ apiConfig, chains }),
        coinbase({ apiConfig, appName, chains }),
        metaMask({
          apiConfig,
          chains,
          shimDisconnect: true,
        }),
        ...(needsInjectedWalletFallback
          ? [injected({ chains, shimDisconnect: true })]
          : []),
        walletConnect({ chains }),
      ],
    },
  ];
};
