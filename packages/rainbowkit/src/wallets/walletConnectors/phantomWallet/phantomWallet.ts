import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const phantomWallet = (): Wallet => {
  return {
    id: 'phantom',
    name: 'Phantom',
    rdns: 'app.phantom',
    iconUrl: async () => (await import('./phantomWallet.svg')).default,
    iconBackground: '#9A8AEE',
    installed: hasInjectedProvider({ namespace: 'phantom.ethereum' }),
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=app.phantom',
      ios: 'https://apps.apple.com/app/phantom-solana-wallet/1598432977',
      mobile: 'https://phantom.app/download',
      qrCode: 'https://phantom.app/download',
      chrome:
        'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
      firefox: 'https://addons.mozilla.org/firefox/addon/phantom-app/',
      browserExtension: 'https://phantom.app/download',
    },
    extension: {
      instructions: {
        steps: [
          {
            description:
              'wallet_connectors.phantom.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.phantom.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.phantom.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.phantom.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.phantom.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.phantom.extension.step3.title',
          },
        ],
        learnMoreUrl: 'https://help.phantom.app',
      },
    },
    createConnector: getInjectedConnector({
      namespace: 'phantom.ethereum',
    }),
  };
};
