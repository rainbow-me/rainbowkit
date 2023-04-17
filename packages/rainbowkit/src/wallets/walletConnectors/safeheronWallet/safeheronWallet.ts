/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface SafeheronWalletOptions {
  chains: Chain[];
}

declare global {
  interface Window {
    safeheron: any;
  }
}

export const safeheronWallet = ({
  chains,
  ...options
}: SafeheronWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'safeheron',
  name: 'Safeheron',
  installed:
    typeof window !== 'undefined' &&
    typeof window.safeheron !== 'undefined' &&
    (window.safeheron as any).isSafeheron === true,
  iconUrl: async () => (await import('./safeheronWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/safeheron/aiaghdjafpiofpainifbgfgjfpclngoh',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: {
        getProvider: () =>
          typeof window !== 'undefined' ? window.safeheron : undefined,
        ...options,
      },
    }),
  }),
});
