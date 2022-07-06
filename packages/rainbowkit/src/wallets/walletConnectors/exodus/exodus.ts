/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface ExodusOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const exodus = ({ chains, shimDisconnect }: ExodusOptions): Wallet => ({
  id: 'exodus',
  name: 'Exodus',
  iconUrl: async () => (await import('./exodus.svg')).default,
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' && window.ethereum?.isExodus === true,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/exodus/aholpfdialjgjfhomihkjbmgjidlcdno',
  },
  createConnector: () => {
    return {
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect },
      }),
    };
  },
});
