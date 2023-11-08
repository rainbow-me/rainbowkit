import { Wallet } from '../../Wallet';
import { getDefaultInjectedConnector } from '../../getInjectedConnector';

export const injectedWallet = (): Wallet => ({
  id: 'injected',
  name: 'Browser Wallet',
  iconUrl: async () => (await import('./injectedWallet.svg')).default,
  iconBackground: '#fff',
  createConnector: getDefaultInjectedConnector(),
});
