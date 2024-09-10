import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const magicEdenWallet = (): Wallet => {
  return {
    id: 'magicEden',
    name: 'Magic Eden Wallet',
    rdns: 'io.magiceden.wallet',
    iconUrl: async () => (await import('./magicEden.svg')).default,
    iconBackground: '#36114D',
    installed: hasInjectedProvider({ namespace: 'magicEden.ethereum' }),
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/magic-eden-wallet/mkpegjkblkkefacfnmkajcjmabijhclg',
      browserExtension: 'https://wallet.magiceden.io/',
    },
    extension: {
      instructions: {
        steps: [
          {
            description:
              'wallet_connectors.magicEden.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.magicEden.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.magicEden.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.magicEden.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.magicEden.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.magicEden.extension.step3.title',
          },
        ],
        learnMoreUrl: 'https://wallet.magiceden.io/support',
      },
    },
    createConnector: getInjectedConnector({
      namespace: 'magicEden.ethereum',
    }),
  };
};
