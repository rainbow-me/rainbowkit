/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface RabbyWalletOptions {
  chains: Chain[];
}

export const rabbyWallet = ({
  chains,
  ...options
}: RabbyWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'rabby',
  name: 'Rabby',
  iconUrl: async () => (await import('./rabbyWallet.svg')).default,
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isRabby === true,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
  }),
});
