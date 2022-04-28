import { Chain as WagmiChain } from 'wagmi';
import { WalletList } from './Wallet';
import { connectorsForWallets } from './connectorsForWallets';
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
}): {
  connectors: ReturnType<typeof connectorsForWallets>;
  wallets: WalletList;
} => {
  const needsInjectedWalletFallback =
    typeof window !== 'undefined' &&
    // @ts-expect-error
    window.ethereum &&
    // @ts-expect-error
    !window.ethereum.isMetaMask &&
    // @ts-expect-error
    !window.ethereum.isCoinbaseWallet;

  const wallets: WalletList = [
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

  return {
    connectors: connectorsForWallets(wallets),
    wallets,
  };
};
