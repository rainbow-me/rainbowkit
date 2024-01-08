import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';

/**
 * @protected `braveWallet` interface
 */
export interface BraveWalletOptions {
  chains: Chain[];
}

/**
 * @protected Brave Browser wallet connector
 */
export const braveWallet = ({ chains }: BraveWalletOptions): Wallet => ({
  id: 'brave',
  name: 'Brave Wallet',
  iconUrl: async () => (await import('./braveWallet.svg')).default,
  iconBackground: '#fff',
  installed: hasInjectedProvider({ flag: 'isBraveWallet' }),
  downloadUrls: {
    // We're opting not to provide a download prompt if Brave isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },
  createConnector: () => ({
    connector: getInjectedConnector({ chains, flag: 'isBraveWallet' }),
  }),
});
