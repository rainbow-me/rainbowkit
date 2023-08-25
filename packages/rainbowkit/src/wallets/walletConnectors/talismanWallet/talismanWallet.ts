/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

declare global {
  interface Window {
    talismanEth: Window['ethereum'];
  }
}

export interface TalismanWalletOptions {
  chains: Chain[];
}

export const talismanWallet = ({
  chains,
  ...options
}: TalismanWalletOptions & InjectedConnectorOptions): Wallet => ({
  id: 'talisman',
  name: 'Talisman',
  iconUrl: async () => (await import('./talismanWallet.svg')).default,
  iconBackground: '#fff',
  installed:
    typeof window !== 'undefined' &&
    typeof window.talismanEth !== 'undefined' &&
    window.talismanEth.isTalisman === true,
  downloadUrls: {
    chrome:
      'https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
    firefox:
      'https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/',
    browserExtension: 'https://talisman.xyz/download',
  },
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: {
        getProvider: () => {
          if (typeof window === 'undefined') return;
          return window.talismanEth;
        },
        ...options,
      },
    }),
    extension: {
      instructions: {
        learnMoreUrl: 'https://talisman.xyz/',
        steps: [
          {
            description:
              'We recommend pinning Talisman to your taskbar for quicker access to your wallet.',
            step: 'install',
            title: 'Install the Talisman extension',
          },
          {
            description:
              'Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone.',
            step: 'create',
            title: 'Create or Import an Ethereum Wallet',
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
