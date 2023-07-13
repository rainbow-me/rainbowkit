/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface DesigWalletOptions {
  chains: Chain[];
}

export const desigWallet = ({
  chains,
  ...options
}: DesigWalletOptions & InjectedConnectorOptions): Wallet => {
  return {
    id: 'desig',
    name: 'Desig Wallet',
    iconUrl: async () => (await import('./desigWallet.svg')).default,
    iconBackground: '#ffffff',
    installed: (window as any)?.desig?.ethereum,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=io.desig.app',
      ios: 'https://apps.apple.com/app/desig-wallet/id6450106028',
      qrCode: 'https://desig.io',
      mobile: 'https://desig.io',
      browserExtension:
        'https://chrome.google.com/webstore/detail/desig-wallet/panpgppehdchfphcigocleabcmcgfoca',
    },

    createConnector: () => {
      const getProvider = () =>
        typeof window !== 'undefined'
          ? (window as any).desig?.ethereum
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
                  'We recommend pinning Desig to your taskbar for easier access to your wallet.',
                step: 'install',
                title: 'Install the Desig extension',
              },
              {
                description:
                  'Be sure to back up your account for added security and easy wallet recovery.',
                step: 'create',
                title: 'Create a Wallet',
              },
              {
                description:
                  'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Refresh your browser',
              },
            ],
            learnMoreUrl: 'https://desig.io',
          },
        },
      };
    },
  };
};
