import { Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';

export const compassWallet = (): Wallet => ({
  id: 'compass',
  name: 'Compass Wallet',
  installed: !!window.compassEvm,
  iconUrl: async () => (await import('./compassWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    chrome:
      'https://chromewebstore.google.com/detail/compass-canary-build/lifffofignanainchjlljapjekjjlaeb?hl=en-GB&authuser=0',
  },
  createConnector: getInjectedConnector({ target: window.compassEvm }),
});
