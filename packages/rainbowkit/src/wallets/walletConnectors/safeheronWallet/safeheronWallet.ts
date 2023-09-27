import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { translateWithLocaleLocalStorage } from '../../../locales';
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
            description: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.safeheron.step1.description'
            ),
            step: 'install',
            title: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.safeheron.step1.title'
            ),
          },
          {
            description: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.safeheron.step2.description'
            ),
            step: 'create',
            title: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.safeheron.step2.title'
            ),
          },
          {
            description: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.safeheron.step3.description'
            ),
            step: 'refresh',
            title: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.safeheron.step3.title'
            ),
          },
        ],
      },
    },
  }),
});
