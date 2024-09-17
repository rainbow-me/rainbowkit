import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const berasigWallet = (): Wallet => {
  return {
    id: 'berasig',
    name: 'BeraSig',
    iconUrl: async () => (await import('./berasigWallet.svg')).default,
    iconBackground: '#ffffff',
    installed: hasInjectedProvider({ namespace: 'berasig.ethereum' }),
    downloadUrls: {
      ios: 'https://apps.apple.com/us/app/berasig-wallet-on-berachain/id6502052535',
      qrCode: 'https://berasig.com',
      mobile: 'https://berasig.com',
      browserExtension:
        'https://chromewebstore.google.com/detail/berasig/ckedkkegjbflcfblcjklibnedmfjppbj',
    },
    extension: {
      instructions: {
        steps: [
          {
            description:
              'wallet_connectors.berasig.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.berasig.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.berasig.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.berasig.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.berasig.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.berasig.extension.step3.title',
          },
        ],
        learnMoreUrl: 'https://berasig.com',
      },
    },
    createConnector: getInjectedConnector({
      namespace: 'berasig.ethereum',
    }),
  };
};
