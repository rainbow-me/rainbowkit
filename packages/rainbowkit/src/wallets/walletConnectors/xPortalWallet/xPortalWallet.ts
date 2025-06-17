import { isIOS } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';

export const xPortalWallet = (): Wallet => {
  const getUri = (uri: string) => {
    return isIOS() ? `xportal://wc?uri=${encodeURIComponent(uri)}` : uri;
  };

  return {
    id: 'xportal',
    name: 'xPortal',
    rdns: 'com.elrond.maiar.wallet',
    iconUrl: async () => (await import('./xPortalWallet.svg')).default,
    iconAccent: '#23f7dd',
    iconBackground: '#23f7dd',
    flag: 'isxPortal',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.elrond.maiar.wallet',
      ios: 'https://apps.apple.com/us/app/xportal-btc-crypto-wallet/id1519405832',
      qrCode: 'https://xportal.com/app',
    },
    mobile: {
      getUri,
    },
    qrCode: {
      getUri,
      instructions: {
        learnMoreUrl:
          'https://help.xportal.com/en/articles/7038000-register-create-account',
        steps: [
          {
            description: 'wallet_connectors.xportal.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.xportal.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.xportal.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.xportal.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.xportal.qr_code.step3.description',
            step: 'scan',
            title: 'wallet_connectors.xportal.qr_code.step3.title',
          },
        ],
      },
    },
  };
};
