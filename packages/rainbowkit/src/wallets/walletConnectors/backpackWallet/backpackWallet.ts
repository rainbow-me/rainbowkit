import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import type { Wallet } from '../../Wallet';

export const backpackWallet = (): Wallet => {
  return {
    id: 'backpack',
    name: 'Backpack',
    rdns: 'app.backpack.mobile',
    iconUrl: async () => (await import('./backpackWallet.svg')).default,
    iconBackground: '#ffffff',
    installed: hasInjectedProvider({ namespace: 'backpack.ethereum' }),
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=app.backpack.mobile',
      browserExtension: 'https://backpack.app/download',
      chrome:
        'https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof',
      ios: 'https://apps.apple.com/app/backpack-wallet-exchange/id6445964121',
      mobile: 'https://backpack.app/download',
      qrCode: 'https://backpack.app/download',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://support.backpack.exchange/support/wallet',
        steps: [
          {
            description:
              'wallet_connectors.backpack.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.backpack.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.backpack.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.backpack.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.backpack.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.backpack.extension.step3.title',
          },
        ],
      },
    },
    createConnector: getInjectedConnector({ namespace: 'backpack.ethereum' }),
  };
};
