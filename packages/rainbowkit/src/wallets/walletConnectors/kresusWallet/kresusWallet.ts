import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type KresusWalletOptions = DefaultWalletOptions;

export const kresusWallet = ({
  projectId,
  walletConnectParameters,
}: KresusWalletOptions): Wallet => ({
  id: 'kresus-wallet',
  name: 'Kresus Wallet',
  iconUrl: async () => (await import('./kresusWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.kresus.superapp',
    ios: 'https://apps.apple.com/us/app/kresus-crypto-nft-superapp/id6444355152',
    qrCode: 'https://kresusconnect.kresus.com/download',
  },
  mobile: {
    getUri: (uri: string) =>
      `com.kresus.superapp://wc?uri=${encodeURIComponent(uri)}`,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://kresus.com/',
      steps: [
        {
          description: 'wallet_connectors.kresus.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.kresus.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.kresus.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.kresus.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.kresus.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.kresus.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
