/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface TahoWalletOptions {
  chains: Chain[];
}

declare global {
  interface Window {
    tally: any;
  }
}

export const tahoWallet = ({
  chains,
  ...options
}: TahoWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'taho',
  name: 'Taho',
  iconBackground: '#d08d57',
  iconUrl: async () => (await import('./tahoWallet.svg')).default,
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd',
  },
  installed:
    typeof window !== 'undefined' &&
    typeof window.tally !== 'undefined' &&
    window['tally']
      ? true
      : undefined,
  createConnector: () => {
    return {
      connector: new InjectedConnector({
        chains,
        options: {
          getProvider: () => {
            const getTaho = (tally?: any) =>
              tally?.isTally ? tally : undefined;
            if (typeof window === 'undefined') return;
            return getTaho(window.tally);
          },
          ...options,
        },
      }),
    };
  },
});
