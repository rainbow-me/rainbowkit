import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import type { Wallet } from '../../Wallet';

export const lockerWallet = (): Wallet => ({
  id: 'locker',
  name: 'Locker Wallet',
  rdns: 'com.lockerprotocol.wallet',
  iconUrl: async () => (await import('./lockerWallet.svg')).default,
  iconAccent: '#9900CC',
  iconBackground: '#fff',
  installed: hasInjectedProvider({ flag: 'isLockerWallet' }),
  downloadUrls: {
    chrome:
      'https://chromewebstore.google.com/detail/locker-protocol-wallet/pdkhlfhhjkdepnppbdpliepjaocghibh',
    firefox: 'https://addons.mozilla.org/firefox/addon/locker-protocol-wallet/',
    browserExtension: 'https://lockerprotocol.com',
  },
  extension: {
    instructions: {
      learnMoreUrl: 'https://lockerprotocol.com',
      steps: [
        {
          description: 'wallet_connectors.locker.extension.step1.description',
          step: 'install',
          title: 'wallet_connectors.locker.extension.step1.title',
        },
        {
          description: 'wallet_connectors.locker.extension.step2.description',
          step: 'scan',
          title: 'wallet_connectors.locker.extension.step2.title',
        },
        {
          description: 'wallet_connectors.locker.extension.step3.description',
          step: 'refresh',
          title: 'wallet_connectors.locker.extension.step3.title',
        },
      ],
    },
  },
  createConnector: getInjectedConnector({ flag: 'isLockerWallet' }),
});
