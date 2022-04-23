/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { isIOS } from '../../../utils/isMobile';
import { Wallet, WalletConfig } from '../../Wallet';
import { getJsonRpcUrl } from '../../getJsonRpcUrl';

export interface CoinbaseOptions {
  apiConfig?: WalletConfig['apiConfig'];
  appName: WalletConfig['appName'];
  chains: WalletConfig['chains'];
}

export const coinbase = ({
  apiConfig,
  appName,
  chains,
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
    },
    createConnector: ({ chainId }) => {
      const ios = isIOS();

      const jsonRpcUrl = getJsonRpcUrl({
        apiConfig,
        chains,
      });

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
