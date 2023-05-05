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
              description:
                'We recommend pinning Taho to your taskbar for quicker access to your wallet.',
              step: 'install',
              title: 'Install the Taho extension',
            },
            {
              description:
                'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Once you set up your wallet, click below to refresh the browser and load up the extension.',
              step: 'refresh',
              title: 'Refresh your browser',
            },
          ],
        },
      },
    };
  },
});
