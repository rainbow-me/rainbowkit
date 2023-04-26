/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface EnkryptWalletOptions {
  chains: Chain[];
}

export const enkryptWallet = ({
  chains,
  ...options
}: EnkryptWalletOptions & InjectedConnectorOptions): Wallet => {
  return {
    id: 'enkrypt',
    name: 'Enkrypt',
    iconUrl: async () => (await import('./enkryptWallet.svg')).default,
    iconBackground: '#fff',
    installed:
      (typeof window !== 'undefined' && !!(window as any).enkrypt) || undefined,
    downloadUrls: {
      browserExtension: 'https://www.enkrypt.com',
    },
    createConnector: () => {
      const getProvider = () =>
        typeof window !== 'undefined'
          ? ((window as any).enkrypt as any)?.providers?.ethereum
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
                  'We recommend pinning Enkrypt to your taskbar for easier access to your wallet.',
                step: 'install',
                title: 'Install the Enkrypt extension',
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
          },
          learnMoreUrl: 'https://www.enkrypt.com',
        },
      };
    },
  };
};
