import type { Wallet } from '../../Wallet';

export const ramperWallet = (): Wallet => {
  return {
    id: 'ramper',
    name: 'Ramper Wallet',
    iconUrl: async () => (await import('./ramperWallet.svg')).default,
    namespace: 'ramper2.provider',
    iconAccent: '#CDA349',
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/ramper-wallet/nbdhibgjnjpnkajaghbffjbkcgljfgdi',
      browserExtension: 'https://www.ramper.xyz/download',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://www.ramper.xyz',
        steps: [
          {
            description: 'wallet_connectors.ramper.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.ramper.extension.step1.title',
          },
          {
            description: 'wallet_connectors.ramper.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.ramper.extension.step2.title',
          },
          {
            description: 'wallet_connectors.ramper.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.ramper.extension.step3.title',
          },
        ],
      },
    },
  };
};
