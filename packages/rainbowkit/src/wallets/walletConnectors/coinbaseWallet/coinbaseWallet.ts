import { createConnector } from 'wagmi';
import { coinbaseWallet as coinbaseWagmiWallet } from '../../../connectors/coinbaseWallet';
import { isIOS } from '../../../utils/isMobile';
import { Wallet, WalletDetailsParams } from '../../Wallet';
import { hasInjectedProvider } from '../../getInjectedConnector';

export interface CoinbaseWalletOptions {
  appName: string;
  appIcon?: string;
}

export const coinbaseWallet = ({
  appName,
  appIcon,
}: CoinbaseWalletOptions): Wallet => {
  const isCoinbaseWalletInjected = hasInjectedProvider({
    flag: 'isCoinbaseWallet',
  });

  const getUri = (uri: string) => uri;
  const ios = isIOS();

  return {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    shortName: 'Coinbase',
    rdns: 'com.coinbase.wallet',
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
    createConnector: (walletDetails: WalletDetailsParams) =>
      createConnector((config) => ({
        ...coinbaseWagmiWallet({
          appName,
          appLogoUrl: appIcon,
          headlessMode: true,
          enableMobileWalletLink: true,
        })(config),
        ...walletDetails,
      })),
  };
};
