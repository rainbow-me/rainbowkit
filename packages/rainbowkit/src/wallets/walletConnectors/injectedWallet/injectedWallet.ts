import type { Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';

export const injectedWallet = () =>
  ({
    id: 'injected' as const,
    name: 'Browser Wallet',
    iconUrl: async () => (await import('./injectedWallet.svg')).default,
    iconBackground: '#fff',
    createConnector: getInjectedConnector({}),
  }) satisfies Wallet;
