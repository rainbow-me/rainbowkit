/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../Wallet';

export interface CoinbaseOptions {
  chains: Chain[];
  appName: string;
  jsonRpcUrl: string | ((args: { chainId?: number }) => string);
}

export const coinbase = ({
  appName,
  chains,
  jsonRpcUrl,
}: CoinbaseOptions): Wallet => ({
  id: 'coinbase',
  name: 'Coinbase Wallet',
  shortName: 'Coinbase',
  iconUrl:
    'https://cloudflare-ipfs.com/ipfs/QmUavPiuPLYip1yG5tURat6gEqPf2ApffQ3BXE2RBr7Y4j',
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
    android: 'https://play.google.com/store/apps/details?id=org.toshi',
    ios: 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
  },
  createConnector: ({ chainId }) => ({
    connector:
      typeof window !== 'undefined' &&
      // @ts-expect-error
      window.ethereum?.isCoinbaseWallet
        ? new InjectedConnector({ chains })
        : new WalletLinkConnector({
            chains,
            options: {
              appName,
              jsonRpcUrl:
                typeof jsonRpcUrl === 'function'
                  ? jsonRpcUrl({ chainId })
                  : jsonRpcUrl,
            },
          }),
  }),
});
