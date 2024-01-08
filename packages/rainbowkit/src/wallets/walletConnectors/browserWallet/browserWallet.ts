import { Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';

export const browserWallet = (): Wallet => ({
  id: 'injected',
  name: 'Browser Wallet',
  iconUrl: async () => (await import('./browserWallet.svg')).default,
  iconBackground: '#fff',
  createConnector: getInjectedConnector({}),
});
