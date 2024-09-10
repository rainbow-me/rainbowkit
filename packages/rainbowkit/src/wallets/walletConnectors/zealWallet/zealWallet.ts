import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type ZealWalletOptions = DefaultWalletOptions;

export const zealWallet = ({
  projectId,
  walletConnectParameters,
}: ZealWalletOptions): Wallet => {
  const isZealWalletInjected = hasInjectedProvider({ flag: 'isZeal' });

  const shouldUseWalletConnect = !isZealWalletInjected;

  return {
    id: 'zeal',
    name: 'Zeal',
    rdns: 'app.zeal',
    iconUrl: async () => (await import('./zealWallet.svg')).default,
    iconBackground: '#fff0',
    iconAccent: '#00FFFF',
    downloadUrls: {
      browserExtension: 'https://zeal.app',
      chrome:
        'https://chromewebstore.google.com/detail/zeal-wallet/heamnjbnflcikcggoiplibfommfbkjpj',
      android: 'https://play.google.com/store/apps/details?id=app.zeal.wallet',
      ios: 'https://testflight.apple.com/join/MP72Ytw8',
      mobile: 'https://zeal.app',
      qrCode: 'https://zeal.app',
    },
    mobile: {
      getUri: shouldUseWalletConnect
        ? (uri: string) => {
            return `zeal://wc?uri=${encodeURIComponent(uri)}`;
          }
        : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://zeal.app',
            steps: [
              {
                description: 'wallet_connectors.zeal.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.zeal.qr_code.step1.title',
              },
              {
                description: 'wallet_connectors.zeal.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.zeal.qr_code.step2.title',
              },
              {
                description: 'wallet_connectors.zeal.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.zeal.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://zeal.app',
        steps: [
          {
            description: 'wallet_connectors.zeal.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.zeal.extension.step1.title',
          },
          {
            description: 'wallet_connectors.zeal.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.zeal.extension.step2.title',
          },
          {
            description: 'wallet_connectors.zeal.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.zeal.extension.step3.title',
          },
        ],
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ flag: 'isZeal' }),
  };
};
