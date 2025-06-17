import type { Wallet } from '../../Wallet';

export const injectedWallet = (): Wallet => ({
  id: 'injected',
  name: 'Browser Wallet',
  iconUrl: async () => (await import('./injectedWallet.svg')).default,
  iconBackground: '#fff',
});
