/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { translateWithLocaleLocalStorage } from '../../../locales';
import { Wallet } from '../../Wallet';

export interface RabbyWalletOptions {
  chains: Chain[];
}

export const rabbyWallet = ({
  chains,
  ...options
}: RabbyWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'rabby',
  name: 'Rabby Wallet',
  iconUrl: async () => (await import('./rabbyWallet.svg')).default,
  iconBackground: '#8697FF',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isRabby === true,
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch',
    browserExtension: 'https://rabby.io',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
    extension: {
      instructions: {
        learnMoreUrl: 'https://rabby.io/',
        steps: [
          {
            description: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.rabby.step1.description'
            ),
            step: 'install',
            title: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.rabby.step1.title'
            ),
          },
          {
            description: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.rabby.step2.description'
            ),
            step: 'create',
            title: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.rabby.step2.title'
            ),
          },
          {
            description: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.rabby.step3.description'
            ),
            step: 'refresh',
            title: translateWithLocaleLocalStorage(
              'wallet_connectors.extension.rabby.step3.title'
            ),
          },
        ],
      },
    },
  }),
});
