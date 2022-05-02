/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';

export interface CoinbaseOptions {
  chains: Chain[];
  appName: string;
  jsonRpcUrl: string | ((args: { chainId?: number }) => string);
}

export const coinbase = ({
  appName,
  chains,
  jsonRpcUrl,
}: CoinbaseOptions): Wallet => {
  const isCoinbaseInjected =
    typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet;

  return {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    shortName: 'Coinbase',
    iconUrl: async () => (await import('./coinbase.svg')).default,
    iconBackground: '#2c5ff6',
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      android: 'https://play.google.com/store/apps/details?id=org.toshi',
      ios: 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
      qrCode: 'https://coinbase-wallet.onelink.me/q5Sx/fdb9b250',
    },
    createConnector: ({ chainId }) => {
      const ios = isIOS();

      const connector = isCoinbaseInjected
        ? new InjectedConnector({ chains })
        : new CoinbaseWalletConnector({
            chains,
            options: {
              appName,
              headlessMode: true,
              jsonRpcUrl:
                typeof jsonRpcUrl === 'function'
                  ? jsonRpcUrl({ chainId })
                  : jsonRpcUrl,
            },
          });

      const getUri = async () => (await connector.getProvider()).qrUrl;

      return {
        connector,
        ...(ios
          ? {}
          : {
              mobile: { getUri },
              qrCode: { getUri },
            }),
      };
    },
  };
};
