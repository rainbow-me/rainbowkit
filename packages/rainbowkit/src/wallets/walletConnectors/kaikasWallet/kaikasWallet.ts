import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const kaikasWallet = (): Wallet => {
  const isKaikasWalletInjected = hasInjectedProvider({
    namespace: 'klaytn',
  });

  return {
    id: 'kaikas',
    name: 'Kaikas',
    iconUrl: async () => (await import('./kaikasWallet.svg')).default,
    installed: isKaikasWalletInjected,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
      android: 'https://play.google.com/store/apps/details?id=io.klutch.wallet',
      ios: 'https://apps.apple.com/us/app/kaikas-mobile-crypto-wallet/id1626107061',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://kaikas.io',
        steps: [
          {
            description: 'wallet_connectors.kaikas.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.kaikas.extension.step1.title',
          },
          {
            description: 'wallet_connectors.kaikas.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.kaikas.extension.step2.title',
          },
          {
            description: 'wallet_connectors.kaikas.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.kaikas.extension.step3.title',
          },
        ],
      },
    },
    createConnector: getInjectedConnector({
      namespace: 'klaytn',
    }),
  };
};
