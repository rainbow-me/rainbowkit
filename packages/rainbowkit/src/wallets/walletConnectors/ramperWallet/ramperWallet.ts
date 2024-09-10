import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const ramperWallet = (): Wallet => {
  const isRamperWalletInjected = hasInjectedProvider({
    namespace: 'ramper2.provider',
  });

  return {
    id: 'ramper',
    name: 'Ramper Wallet',
    iconUrl: async () => (await import('./ramperWallet.svg')).default,
    installed: isRamperWalletInjected,
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
    createConnector: getInjectedConnector({
      namespace: 'ramper2.provider',
    }),
  };
};
