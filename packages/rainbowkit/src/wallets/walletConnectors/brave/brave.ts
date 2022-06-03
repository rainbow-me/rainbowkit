/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface BraveOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const brave = ({ chains, shimDisconnect }: BraveOptions): Wallet => ({
  id: 'brave',
  name: 'Brave Wallet',
  iconUrl: async () => (await import('./brave.svg')).default,
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' && window.ethereum?.isBraveWallet === true,
  downloadUrls: {
    // We're opting not to provide a download prompt if Brave isn't the current
    // browser since it's unlikely to be a desired behavior for users. It's
    // more of a convenience for users who are already using Brave rather than
    // an explicit wallet choice for users coming from other browsers.
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
