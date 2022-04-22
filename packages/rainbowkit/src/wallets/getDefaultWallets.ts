import { Chain as WagmiChain } from 'wagmi';
import { WalletList } from './Wallet';
import {
  coinbase,
  CoinbaseOptions,
} from './walletConnectors/coinbase/coinbase';
import { injected } from './walletConnectors/injected/injected';
import { metaMask } from './walletConnectors/metaMask/metaMask';
import { rainbow } from './walletConnectors/rainbow/rainbow';
import { walletConnect } from './walletConnectors/walletConnect/walletConnect';

export const getDefaultWallets = ({
  appName,
  chains,
  infuraId,
  jsonRpcUrl,
}: {
  chains: WagmiChain[];
  infuraId?: string;
  appName: CoinbaseOptions['appName'];
  jsonRpcUrl: CoinbaseOptions['jsonRpcUrl'];
}): WalletList => {
  const needsInjectedWalletFallback =
    typeof window !== 'undefined' &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

  return [
    {
      groupName: 'Popular',
      wallets: [
        rainbow({ chains, infuraId }),
        coinbase({ appName, chains, jsonRpcUrl }),
        metaMask({ chains, infuraId, shimDisconnect: true }),
        ...(needsInjectedWalletFallback
          ? [injected({ chains, shimDisconnect: true })]
          : []),
        walletConnect({ chains, infuraId }),
      ],
    },
  ];
};
