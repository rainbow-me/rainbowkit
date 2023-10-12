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
              'wallet_connectors.talisman.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.talisman.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.talisman.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.talisman.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.talisman.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.talisman.extension.step3.title',
          },
        ],
      },
    },
  }),
});
