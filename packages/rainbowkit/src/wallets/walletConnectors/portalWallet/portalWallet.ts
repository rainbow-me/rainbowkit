/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface BraveWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const portalWallet = ({
  chains,
  shimDisconnect,
}: BraveWalletOptions): Wallet => ({
  id: 'portal',
  name: 'Ripio Portal',
  iconUrl: async () => (await import('./portal.svg')).default,
  iconAccent: '##65ffb5',
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' && window.ethereum?.isPortal === true,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/ripio-portal/ddamhapapianibkkkcclabgicmpnpdnj',
    qrCode: 'https://www.ripio.com/ar/portal/',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});



