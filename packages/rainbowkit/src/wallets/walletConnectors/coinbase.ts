import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../utils/isMobile';
import { Wallet } from '../Wallet';

export interface CoinbaseOptions {
  chains: Chain[];
  appName: string;
  jsonRpcUrl: string | ((args: { chainId?: number }) => string);
}

export const coinbase =
  ({ appName, chains, jsonRpcUrl }: CoinbaseOptions): Wallet =>
  ({ chainId }) => ({
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
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      mobile: isAndroid()
        ? 'https://play.google.com/store/apps/details?id=org.toshi'
        : 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
    },
    iconUrl:
      'https://cloudflare-ipfs.com/ipfs/QmZbVxx2s9BeZLrqTvgfpbciXmr3D9LLYCETRwjFUYAXEw',
    id: 'coinbase',
    name: 'Coinbase Wallet',
  });
