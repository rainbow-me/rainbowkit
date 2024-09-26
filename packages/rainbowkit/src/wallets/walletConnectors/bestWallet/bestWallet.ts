import type { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions } from './../../Wallet';

export type BestWalletOptions = DefaultWalletOptions;

export const bestWallet = ({
  projectId,
  walletConnectParameters,
}: BestWalletOptions): Wallet => ({
  id: 'bestWallet',
  name: 'Best Wallet',
  iconUrl: async () => (await import('./bestWallet.svg')).default,
  iconBackground: '#5961FF',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.bestwallet.mobile',
    ios: 'https://apps.apple.com/in/app/best-wallet-buy-sell-crypto/id6451312105',
    mobile: 'https://bestwallet.com/',
    qrCode: 'https://bestwallet.com/',
  },

  mobile: {
    getUri: (uri: string) => {
      return `bw://connect/wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://bestwallet.com/',
      steps: [
        {
          description: 'wallet_connectors.best.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.best.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.best.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.best.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.best.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.best.qr_code.step3.title',
        },
      ],
    },
  },

  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
