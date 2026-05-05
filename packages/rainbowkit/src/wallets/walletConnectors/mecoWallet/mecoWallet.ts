import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions } from './../../Wallet';
import type { Wallet } from '../../Wallet';

export type MeCoWalletOptions = DefaultWalletOptions;

export const mecoWallet = ({
  projectId,
  walletConnectParameters,
}: MeCoWalletOptions): Wallet => ({
  id: 'meco',
  name: 'MeCo Wallet',
  rdns: 'com.meco.wallet',
  iconUrl: async () => (await import('./mecoWallet.svg')).default,
  iconBackground: '#7443DF',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.memecore.wallet',
    ios: 'https://apps.apple.com/us/app/meco-wallet/id6749523218',
    mobile: 'https://mecowallet.com',
    chrome: 'https://mecowallet.com',
    qrCode: 'https://mecowallet.com',
  },

  mobile: {
    getUri: (uri: string) => {
      return `mecowallet://wc?uri=${encodeURIComponent(uri)}`;
    },
  },

  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://mecowallet.com/',
      steps: [
        {
          description: 'wallet_connectors.meco.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.meco.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.meco.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.meco.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.meco.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.meco.qr_code.step3.title',
        },
      ],
    },
  },

  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
