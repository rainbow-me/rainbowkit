import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const compassWallet = (): Wallet => {
  const isCompassInjected = hasInjectedProvider({ namespace: 'compassEvm' });

  return {
    id: 'compass',
    name: 'Compass Wallet',
    installed: isCompassInjected,
    rdns: 'io.leapwallet.CompassWallet',
    iconUrl: async () => (await import('./compassWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/compass-wallet-for-sei/anokgmphncpekkhclmingpimjmcooifb',
      browserExtension: 'https://compasswallet.io/download',
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://compasswallet.io/download',
        steps: [
          {
            description:
              'wallet_connectors.compass.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.compass.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.compass.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.compass.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.compass.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.compass.extension.step3.title',
          },
        ],
      },
    },
    createConnector: getInjectedConnector({ namespace: 'compassEvm' }),
  };
};
