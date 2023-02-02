/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface RipioPortalWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const ripioPortalWallet = ({
  chains,
  shimDisconnect,
}: RipioPortalWalletOptions): Wallet => ({
  id: 'ripioPortal',
  name: 'Ripio Portal',
  iconUrl: async () => (await import('./ripioPortalWallet.svg')).default,
  iconAccent: '#65ffb5',
  iconBackground: '#ffffff',
  installed:
    typeof window !== 'undefined' && window.ethereum?.isPortal === true,
  downloadUrls: {
    browserExtension: 'https://www.ripio.com/portal/',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
