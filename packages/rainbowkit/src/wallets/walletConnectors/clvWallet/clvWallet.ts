import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type CLVWalletOptions = DefaultWalletOptions;

export const clvWallet = ({
  projectId,
  walletConnectParameters,
}: CLVWalletOptions): Wallet => {
  const isCLVInjected = hasInjectedProvider({ namespace: 'clover' });
  const shouldUseWalletConnect = !isCLVInjected;

  return {
    id: 'clv',
    name: 'CLV',
    iconUrl: async () => (await import('./clvWallet.svg')).default,
    iconBackground: '#fff',
    iconAccent: '#BDFDE2',
    installed: isCLVInjected,
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/clv-wallet/nhnkbkgjikgcigadomkphalanndcapjk',
      ios: 'https://apps.apple.com/app/clover-wallet/id1570072858',
      mobile: 'https://apps.apple.com/app/clover-wallet/id1570072858',
      qrCode: 'https://clv.org/',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://clv.org/',
        steps: [
          {
            description: 'wallet_connectors.clv.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.clv.extension.step1.title',
          },
          {
            description: 'wallet_connectors.clv.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.clv.extension.step2.title',
          },
          {
            description: 'wallet_connectors.clv.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.clv.extension.step3.title',
          },
        ],
      },
    },
    mobile: {
      getUri: shouldUseWalletConnect ? (uri: string) => uri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://clv.org/',
            steps: [
              {
                description: 'wallet_connectors.clv.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.clv.qr_code.step1.title',
              },
              {
                description: 'wallet_connectors.clv.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.clv.qr_code.step2.title',
              },
              {
                description: 'wallet_connectors.clv.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.clv.qr_code.step3.title',
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
      : getInjectedConnector({ namespace: 'clover' }),
  };
};
