import type { Wallet } from '../../Wallet';

export const magicEdenWallet = (): Wallet => {
  return {
    id: 'magicEden',
    name: 'Magic Eden Wallet',
    rdns: 'io.magiceden.wallet',
    iconUrl: async () => (await import('./magicEden.svg')).default,
    iconBackground: '#36114D',
    namespace: 'magicEden.ethereum',
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
  };
};
