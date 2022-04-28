/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface InjectedOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const injected = ({
  chains,
  shimDisconnect,
}: InjectedOptions): Wallet => ({
  id: 'injected',
  name: 'Injected Wallet',
  iconUrl: async () => (await import('./injected.png')).default,
  iconBackground: '#fff',
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
