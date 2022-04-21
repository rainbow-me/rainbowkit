/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS, isMobile } from '../../../utils/isMobile';
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
    typeof window !== 'undefined' &&
    // @ts-expect-error
    window.ethereum?.isCoinbaseWallet;

  const shouldUseQRCode = isMobile() && !isCoinbaseInjected;

  return {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    shortName: 'Coinbase',
    iconUrl: async () => (await import('./coinbase.svg')).default,
    iconBackground: '#2c5ff6',
    installed: !shouldUseQRCode ? isCoinbaseInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      android: 'https://play.google.com/store/apps/details?id=org.toshi',
      ios: 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
    },
    createConnector: ({ chainId }) => {
      const ios = isIOS();

      const connector = shouldUseQRCode
        ? new CoinbaseWalletConnector({
            chains,
            options: {
              appName,
              headlessMode: true,
              jsonRpcUrl:
                typeof jsonRpcUrl === 'function'
                  ? jsonRpcUrl({ chainId })
                  : jsonRpcUrl,
            },
          })
        : new InjectedConnector({ chains });

      const getUri = () => connector.getProvider().qrUrl;

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
