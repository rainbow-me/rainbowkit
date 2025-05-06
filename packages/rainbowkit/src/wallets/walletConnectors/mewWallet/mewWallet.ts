import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export const mewWallet = ({
  projectId,
  walletConnectParameters,
}: DefaultWalletOptions): Wallet => {
  const getUri = (uri: string) => {
    // MEW Wallet uses associated domain instead of url scheme
    return `https://mewwallet.com/wc?uri=${encodeURIComponent(uri)}`;
  };
  return {
    id: 'mew',
    name: 'MEW wallet',
    iconUrl: async () => (await import('./mewWallet.svg')).default,
    iconBackground: '#fff',
    installed: true,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow',
      ios: 'https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow',
      mobile: 'https://mewwallet.com',
      qrCode: 'https://mewwallet.com',
    },
    mobile: {
      getUri,
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl:
          'https://help.myetherwallet.com/en/articles/5946588-create-and-back-up-your-wallet-with-mew-wallet-ios',
        steps: [
          {
            description: 'wallet_connectors.mew.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.mew.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.mew.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.mew.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.mew.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.mew.qr_code.step3.title',
          },
        ],
      },
    },
    createConnector: getWalletConnectConnector({
      projectId,
      walletConnectParameters,
    }),
  };
};
