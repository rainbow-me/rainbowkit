import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

export const braveWallet = (): Wallet => ({
  id: 'brave',
  name: 'Brave Wallet',
  rdns: 'com.brave.wallet',
  iconUrl: async () => (await import('./braveWallet.svg')).default,
  iconBackground: '#fff',
  installed: hasInjectedProvider({ flag: 'isBraveWallet' }),
  downloadUrls: {
    // We're opting not to provide a download prompt if Brave isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },
  createConnector: getInjectedConnector({ flag: 'isBraveWallet' }),
});
