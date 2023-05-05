/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

declare global {
  interface Window {
    xfi: any;
  }
}

export interface XDEFIWalletOptions {
  chains: Chain[];
}

export const xdefiWallet = ({
  chains,
  ...options
}: XDEFIWalletOptions & InjectedConnectorOptions): Wallet => {
  const isInstalled =
    typeof window !== 'undefined' && typeof window?.xfi !== 'undefined';
  return {
    id: 'xdefi',
    name: 'XDEFI Wallet',
    installed: isInstalled,
    iconUrl: async () => (await import('./xdefiWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
      browserExtension: 'https://xdefi.io',
    },
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: {
          //@ts-ignore
          getProvider: () => {
            return isInstalled ? (window.xfi?.ethereum as any) : undefined;
          },
          ...options,
        },
      }),
      extension: {
        instructions: {
          learnMoreUrl: 'https://xdefi.io/support-categories/xdefi-wallet/',
          steps: [
            {
              description:
                'We recommend pinning XDEFI Wallet to your taskbar for quicker access to your wallet.',
              step: 'install',
              title: 'Install the XDEFI Wallet extension',
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
  };
};
