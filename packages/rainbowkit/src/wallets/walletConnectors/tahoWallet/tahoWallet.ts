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
    chrome:
      'https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd',
    browserExtension: 'https://taho.xyz',
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
      extension: {
        instructions: {
          learnMoreUrl:
            'https://tahowallet.notion.site/Taho-Knowledge-Base-4d95ed5439c64d6db3d3d27abf1fdae5',
          steps: [
            {
              description: 'wallet_connectors.taho.extension.step1.description',
              step: 'install',
              title: 'wallet_connectors.taho.extension.step1.title',
            },
            {
              description: 'wallet_connectors.taho.extension.step2.description',
              step: 'create',
              title: 'wallet_connectors.taho.extension.step2.title',
            },
            {
              description: 'wallet_connectors.taho.extension.step3.description',
              step: 'refresh',
              title: 'wallet_connectors.taho.extension.step3.title',
            },
          ],
        },
      },
    };
  },
});
