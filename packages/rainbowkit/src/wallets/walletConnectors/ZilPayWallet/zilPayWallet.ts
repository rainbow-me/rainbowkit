import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type ZilPayWalletOptions = DefaultWalletOptions;

export const zilPayWallet = ({
  projectId,
  walletConnectParameters,
}: ZilPayWalletOptions): Wallet => {
  const isZilPayInjected = hasInjectedProvider({ flag: 'isZilPay' });
  const shouldUseWalletConnect = !isZilPayInjected;

  return {
    id: 'zilpay',
    name: 'ZilPay',
    rdns: 'io.zilpay',
    iconUrl: async () => (await import('./zilPayWallet.svg')).default,
    iconBackground: '#ffffff',
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=com.zilpaymobile',
      ios: 'https://apps.apple.com/ru/app/zilpay/id1547105860',
      mobile: 'https://zilpay.io/',
      qrCode: 'https://zilpay.io/',
    },
    mobile: {
      getUri: shouldUseWalletConnect
        ? (uri: string) => {
            return `zilpay://wc?uri=${encodeURIComponent(uri)}`;
          }
        : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://zilpay.io',
            steps: [
              {
                description:
                  'wallet_connectors.zilpay.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.zilpay.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.zilpay.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.zilpay.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.zilpay.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.zilpay.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          flag: 'isZilPay',
        }),
  };
};
