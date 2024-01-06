import { Wallet } from '../../Wallet';
import { getDefaultInjectedConnector } from '../../getInjectedConnector';

export const browserWallet = (): Wallet => ({
  id: 'injected',
  name: 'Browser Wallet',
  iconUrl: async () => (await import('./browserWallet.svg')).default,
  iconBackground: '#fff',
  createConnector: getDefaultInjectedConnector(),
});
