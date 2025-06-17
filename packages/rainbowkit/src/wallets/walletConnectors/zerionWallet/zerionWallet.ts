import { isIOS } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';

export const zerionWallet = (): Wallet => {
  const getUri = (uri: string) => {
    return isIOS() ? `zerion://wc?uri=${encodeURIComponent(uri)}` : uri;
  };

  return {
    id: 'zerion',
    name: 'Zerion',
    rdns: 'io.zerion.wallet',
    iconUrl: async () => (await import('./zerionWallet.svg')).default,
    iconAccent: '#2962ef',
    iconBackground: '#2962ef',
    namespace: 'zerionWallet',
    flag: 'isZerion',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=io.zerion.android',
      ios: 'https://apps.apple.com/app/apple-store/id1456732565',
      mobile: 'https://link.zerion.io/pt3gdRP0njb',
      qrCode: 'https://link.zerion.io/pt3gdRP0njb',
      chrome:
        'https://chrome.google.com/webstore/detail/klghhnkeealcohjjanjjdaeeggmfmlpl',
      browserExtension: 'https://zerion.io/extension',
    },
    mobile: {
      getUri,
    },
    qrCode: {
      getUri,
      instructions: {
        learnMoreUrl:
          'https://zerion.io/blog/announcing-the-zerion-smart-wallet/',
        steps: [
          {
            description: 'wallet_connectors.zerion.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.zerion.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.zerion.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.zerion.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.zerion.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.zerion.qr_code.step3.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://help.zerion.io/en/',
        steps: [
          {
            description: 'wallet_connectors.zerion.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.zerion.extension.step1.title',
          },
          {
            description: 'wallet_connectors.zerion.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.zerion.extension.step2.title',
          },
          {
            description: 'wallet_connectors.zerion.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.zerion.extension.step3.title',
          },
        ],
      },
    },
  };
};
