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
      'https://chromewebstore.google.com/detail/compass-wallet-for-sei/anokgmphncpekkhclmingpimjmcooifb',
  },
  createConnector: getInjectedConnector({ target: window.compassEvm }),
});
