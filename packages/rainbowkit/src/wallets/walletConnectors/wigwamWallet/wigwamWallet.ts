import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const wigwamWallet = (): Wallet => {
  return {
    id: 'wigwam',
    name: 'Wigwam',
    rdns: 'com.wigwam.wallet',
    iconBackground: '#80EF6E',
    iconUrl: async () => (await import('./wigwamWallet.svg')).default,
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/wigwam-%E2%80%94-web3-wallet/lccbohhgfkdikahanoclbdmaolidjdfl',
      browserExtension: 'https://wigwam.app',
    },
    installed: hasInjectedProvider({
      namespace: 'wigwamEthereum',
      flag: 'isWigwam',
    }),
    extension: {
      instructions: {
        learnMoreUrl: 'https://wigwam.app/',
        steps: [
          {
            description: 'wallet_connectors.wigwam.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.wigwam.extension.step1.title',
          },
          {
            description: 'wallet_connectors.wigwam.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.wigwam.extension.step2.title',
          },
          {
            description: 'wallet_connectors.wigwam.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.wigwam.extension.step3.title',
          },
        ],
      },
    },
    createConnector: getInjectedConnector({
      namespace: 'wigwamEthereum',
      flag: 'isWigwam',
    }),
  };
};
