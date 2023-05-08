/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface PhantomWalletOptions {
  chains: Chain[];
}

export const phantomWallet = ({
  chains,
  ...options
}: PhantomWalletOptions & InjectedConnectorOptions): Wallet => {
  return {
    id: 'phantom',
    name: 'Phantom',
    iconUrl: async () => (await import('./phantomWallet.svg')).default,
    iconBackground: '#551BF9',
    installed:
      (typeof window !== 'undefined' &&
        !!((window as any).phantom as any)?.ethereum) ||
      undefined,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=app.phantom',
      ios: 'https://apps.apple.com/app/phantom-solana-wallet/1598432977',
      mobile: 'https://phantom.app/download',
      qrCode: 'https://phantom.app/download',
      chrome:
        'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa',
      firefox: 'https://addons.mozilla.org/firefox/addon/phantom-app/',
      browserExtension: 'https://phantom.app/download',
    },
    createConnector: () => {
      const getProvider = () =>
        typeof window !== 'undefined'
          ? ((window as any).phantom as any)?.ethereum
          : undefined;

      const connector = new InjectedConnector({
        chains,
        options: { getProvider, ...options },
      });

      return {
        connector,
        extension: {
          instructions: {
            steps: [
              {
                description:
                  'We recommend pinning Phantom to your taskbar for easier access to your wallet.',
                step: 'install',
                title: 'Install the Phantom extension',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone.',
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
            learnMoreUrl: 'https://help.phantom.app',
          },
        },
      };
    },
  };
};
