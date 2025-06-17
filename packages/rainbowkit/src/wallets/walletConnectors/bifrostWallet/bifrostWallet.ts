import { isAndroid } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';

export const bifrostWallet = (): Wallet => {
  const getUri = (uri: string) => {
    return isAndroid()
      ? uri
      : `https://app.bifrostwallet.com/wc?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'bifrostWallet',
    name: 'Bifrost Wallet',
    rdns: 'com.bifrostwallet',
    iconUrl: async () => (await import('./bifrostWallet.svg')).default,
    iconBackground: '#fff',
    flag: 'isBifrost',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.bifrostwallet.app',
      ios: 'https://apps.apple.com/us/app/bifrost-wallet/id1577198351',
      qrCode: 'https://bifrostwallet.com/#download-app',
    },
    mobile: {
      getUri,
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl:
          'https://support.bifrostwallet.com/en/articles/6886814-how-to-use-walletconnect',
        steps: [
          {
            description: 'wallet_connectors.bifrost.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.bifrost.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.bifrost.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.bifrost.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.bifrost.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.bifrost.qr_code.step3.title',
          },
        ],
      },
    },
  };
};
