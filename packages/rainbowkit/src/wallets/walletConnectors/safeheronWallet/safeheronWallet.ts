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
    // @ts-ignore
    window.safeheron.isSafeheron === true,
  iconUrl: async () => (await import('./safeheronWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/safeheron/aiaghdjafpiofpainifbgfgjfpclngoh',
    browserExtension: 'https://www.safeheron.com/',
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
    extension: {
      instructions: {
        learnMoreUrl: 'https://www.safeheron.com/',
        steps: [
          {
            description:
              'We recommend pinning Safeheron to your taskbar for quicker access to your wallet.',
            step: 'install',
            title: 'Install the Core extension',
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
  }),
});
