import { Chain as WagmiChain } from 'wagmi';
import { Wallets } from './Wallet';
import { coinbase, CoinbaseOptions } from './walletConnectors/coinbase';
import { injected } from './walletConnectors/injected';
import { metaMask } from './walletConnectors/metaMask';
import { rainbow } from './walletConnectors/rainbow';
import { walletConnect } from './walletConnectors/walletConnect';

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
}): Wallets => {
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
        walletConnect({ chains, infuraId }),
        coinbase({ appName, chains, jsonRpcUrl }),
        metaMask({ chains, infuraId, shimDisconnect: true }),
        ...(needsInjectedWalletFallback
          ? [injected({ chains, shimDisconnect: true })]
          : []),
      ],
    },
  ];
};
