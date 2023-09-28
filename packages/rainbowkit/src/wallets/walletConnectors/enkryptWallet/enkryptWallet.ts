import type { InjectedConnectorOptions } from '@wagmi/core';
import { InjectedConnector } from 'wagmi/connectors/injected';
import type { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import type { Wallet } from '../../Wallet';

declare global {
  interface Window {
    enkrypt: {
      providers: {
        ethereum: any;
      };
    };
  }
}

export interface EnkryptWalletOptions {
  chains: Chain[];
}

export const enkryptWallet = ({
  chains,
  ...options
}: EnkryptWalletOptions & InjectedConnectorOptions): Wallet => {
  const isEnkryptInjected =
    typeof window !== 'undefined' &&
    typeof window.enkrypt !== 'undefined' &&
    window?.enkrypt?.providers?.ethereum;
  return {
    id: 'enkrypt',
    name: 'Enkrypt Wallet',
    installed: isEnkryptInjected ? true : undefined,
    iconUrl: async () => (await import('./enkryptWallet.svg')).default,
    iconBackground: '#FFFFFF',
    downloadUrls: {
      qrCode: 'https://www.enkrypt.com',
      chrome:
        'https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh',
      browserExtension: 'https://www.enkrypt.com/',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/enkrypt-ethereum-polkad/gfenajajnjjmmdojhdjmnngomkhlnfjl',
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/enkrypt/',
      opera: 'https://addons.opera.com/en/extensions/details/enkrypt/',
      safari: 'https://apps.apple.com/app/enkrypt-web3-wallet/id1640164309',
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector({
          chains,
          options: {
            getProvider: () =>
              isEnkryptInjected
                ? window?.enkrypt?.providers?.ethereum
                : undefined,
            ...options,
          },
        }),
        extension: {
          instructions: {
            learnMoreUrl: 'https://blog.enkrypt.com/what-is-a-web3-wallet/',
            steps: [
              {
                description:
                  'We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the Enkrypt Wallet extension',
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
  };
};
