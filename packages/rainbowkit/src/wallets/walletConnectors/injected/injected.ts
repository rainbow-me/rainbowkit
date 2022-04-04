/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import iconDataUrl from './injected.png';

export interface InjectedOptions {
  chains: Chain[];
  infuraId?: string;
  shimDisconnect?: boolean;
}

export const injected = ({
  chains,
  shimDisconnect,
}: InjectedOptions): Wallet => ({
  id: 'injected',
  name: 'Injected Wallet',
  iconUrl: iconDataUrl,
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect },
    }),
  }),
});
