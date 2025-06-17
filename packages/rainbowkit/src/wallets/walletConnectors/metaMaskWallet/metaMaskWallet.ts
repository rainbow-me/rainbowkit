import { isAndroid, isIOS } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';

export const metaMaskWallet = (): Wallet => {
  const getUri = (uri: string) => {
    return isAndroid()
      ? uri
      : isIOS()
        ? // currently broken in MetaMask v6.5.0 https://github.com/MetaMask/metamask-mobile/issues/6457
          `metamask://wc?uri=${encodeURIComponent(uri)}`
        : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'metaMask',
    name: 'MetaMask',
    rdns: 'io.metamask',
    iconUrl: async () => (await import('./metaMaskWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    flag: 'isMetaMask',
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
      mobile: 'https://metamask.io/download',
      qrCode: 'https://metamask.io/download',
      chrome:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
      firefox: 'https://addons.mozilla.org/firefox/addon/ether-metamask',
      opera: 'https://addons.opera.com/extensions/details/metamask-10',
      browserExtension: 'https://metamask.io/download',
    },

    mobile: {
      getUri,
    },
    qrCode: {
      getUri,
      instructions: {
        learnMoreUrl: 'https://metamask.io/faqs/',
        steps: [
          {
            description: 'wallet_connectors.metamask.qr_code.step1.description',
            step: 'install',
            title: 'wallet_connectors.metamask.qr_code.step1.title',
          },
          {
            description: 'wallet_connectors.metamask.qr_code.step2.description',
            step: 'create',
            title: 'wallet_connectors.metamask.qr_code.step2.title',
          },
          {
            description: 'wallet_connectors.metamask.qr_code.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.metamask.qr_code.step3.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://metamask.io/faqs/',
        steps: [
          {
            description:
              'wallet_connectors.metamask.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.metamask.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.metamask.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.metamask.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.metamask.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.metamask.extension.step3.title',
          },
        ],
      },
    },
  };
};
