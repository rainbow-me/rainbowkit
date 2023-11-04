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
            description: 'wallet_connectors.rabby.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.rabby.extension.step1.title',
          },
          {
            description: 'wallet_connectors.rabby.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.rabby.extension.step2.title',
          },
          {
            description: 'wallet_connectors.rabby.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.rabby.extension.step3.title',
          },
        ],
      },
    },
  }),
});
