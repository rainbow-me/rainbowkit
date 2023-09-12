/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface ZealWalletOptions {
  chains: Chain[];
}

export const zealWallet = ({
  chains,
  ...options
}: ZealWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'zeal',
  name: 'Zeal',
  iconUrl: async () => (await import('./zealWallet.svg')).default,
  iconBackground: '#fff0',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isZeal === true,
  downloadUrls: {
    browserExtension: 'https://zeal.app',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
    extension: {
      instructions: {
        learnMoreUrl: 'https://zeal.app/',
        steps: [
          {
            description:
              'We recommend pinning Zeal to your taskbar for quicker access to your wallet.',
            step: 'install',
            title: 'Install the Zeal extension',
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
