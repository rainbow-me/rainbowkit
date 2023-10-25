import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { hasInjectedProvider } from '../../getInjectedConnector';

export interface CoinbaseWalletOptions {
  appName: string;
  chains: Chain[];
}

export const coinbaseWallet = ({
  appName,
  chains,
  ...options
}: CoinbaseWalletOptions): Wallet => {
  const isCoinbaseWalletInjected = hasInjectedProvider('isCoinbaseWallet');

  return {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    shortName: 'Coinbase',
    iconUrl: async () => (await import('./coinbaseWallet.svg')).default,
    iconAccent: '#2c5ff6',
    iconBackground: '#2c5ff6',
    // Note that we never resolve `installed` to `false` because the
    // Coinbase Wallet SDK falls back to other connection methods if
    // the injected connector isn't available
    installed: isCoinbaseWalletInjected || undefined,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=org.toshi',
      ios: 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
      mobile: 'https://coinbase.com/wallet/downloads',
      qrCode: 'https://coinbase-wallet.onelink.me/q5Sx/fdb9b250',
      chrome:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      browserExtension: 'https://coinbase.com/wallet',
    },
    createConnector: () => {
      const ios = isIOS();

      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          ...options,
        },
      });

      const getUri = async () => (await connector.getProvider()).qrUrl;

      return {
        connector,
        ...(ios
          ? {}
          : {
              qrCode: {
                getUri,
                instructions: {
                  learnMoreUrl:
                    'https://coinbase.com/wallet/articles/getting-started-mobile',
                  steps: [
                    {
                      description:
                        'wallet_connectors.coinbase.qr_code.step1.description',
                      step: 'install',
                      title: 'wallet_connectors.coinbase.qr_code.step1.title',
                    },
                    {
                      description:
                        'wallet_connectors.coinbase.qr_code.step2.description',
                      step: 'create',
                      title: 'wallet_connectors.coinbase.qr_code.step2.title',
                    },
                    {
                      description:
                        'wallet_connectors.coinbase.qr_code.step3.description',
                      step: 'scan',
                      title: 'wallet_connectors.coinbase.qr_code.step3.title',
                    },
                  ],
                },
              },
              extension: {
                instructions: {
                  learnMoreUrl:
                    'https://coinbase.com/wallet/articles/getting-started-extension',
                  steps: [
                    {
                      description:
                        'wallet_connectors.coinbase.extension.step1.description',
                      step: 'install',
                      title: 'wallet_connectors.coinbase.extension.step1.title',
                    },
                    {
                      description:
                        'wallet_connectors.coinbase.extension.step2.description',
                      step: 'create',
                      title: 'wallet_connectors.coinbase.extension.step2.title',
                    },
                    {
                      description:
                        'wallet_connectors.coinbase.extension.step3.description',
                      step: 'refresh',
                      title: 'wallet_connectors.coinbase.extension.step3.title',
                    },
                  ],
                },
              },
            }),
      };
    },
  };
};
