import type { Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';

export const injectedWallet = (): Wallet => ({
  id: 'injected',
  name: 'Browser Wallet',
  iconUrl: async () => (await import('./injectedWallet.svg')).default,
  iconBackground: '#fff',
  createConnector: getInjectedConnector({}),
});
