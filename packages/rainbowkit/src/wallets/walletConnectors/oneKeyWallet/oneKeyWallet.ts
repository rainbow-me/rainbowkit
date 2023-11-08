import { Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';

declare global {
  interface Window {
    $onekey: any;
  }
}

export const oneKeyWallet = (): Wallet => {
  const provider = typeof window !== 'undefined' && window['$onekey']?.ethereum;
  const isOnekeyInjected = Boolean(provider);

  return {
    id: 'onekey',
    name: 'OneKey',
    iconAccent: '#00B812',
    iconBackground: '#fff',
    iconUrl: async () => (await import('./oneKeyWallet.svg')).default,
    installed: isOnekeyInjected,

    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=so.onekey.app.wallet',
      browserExtension: 'https://www.onekey.so/download/',
      chrome:
        'https://chrome.google.com/webstore/detail/onekey/jnmbobjmhlngoefaiojfljckilhhlhcj',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/onekey/obffkkagpmohennipjokmpllocnlndac',
      ios: 'https://apps.apple.com/us/app/onekey-open-source-wallet/id1609559473',
      mobile: 'https://www.onekey.so/download/',
      qrCode: 'https://www.onekey.so/download/',
    },

    extension: {
      instructions: {
        learnMoreUrl: 'https://help.onekey.so/hc/en-us/categories/360000170236',
        steps: [
          {
            description:
              'wallet_connectors.one_key.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.one_key.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.one_key.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.one_key.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.one_key.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.one_key.extension.step3.title',
          },
        ],
      },
    },

    createConnector: getInjectedConnector({
      target: provider,
    }),
  };
};
