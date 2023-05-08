/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface BitskiWalletOptions {
  chains: Chain[];
}

export const bitskiWallet = ({
  chains,
  ...options
}: BitskiWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'bitski',
  name: 'Bitski',
  installed:
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    ((window.ethereum as any).isBitski === true ||
      !!window.ethereum.providers?.find((p: any) => p.isBitski === true)),
  iconUrl: async () => (await import('./bitskiWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell',
    browserExtension: 'https://bitski.com',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options,
    }),
    extension: {
      instructions: {
        learnMoreUrl:
          'https://bitski.zendesk.com/hc/articles/12803972818836-How-to-install-the-Bitski-browser-extension',
        steps: [
          {
            description:
              'We recommend pinning Bitski to your taskbar for quicker access to your wallet.',
            step: 'install',
            title: 'Install the Bitski extension',
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
