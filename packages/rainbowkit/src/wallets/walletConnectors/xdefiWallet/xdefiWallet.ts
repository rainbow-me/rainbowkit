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
                'wallet_connectors.xdefi.extension.step1.description',
              step: 'install',
              title: 'wallet_connectors.xdefi.extension.step1.title',
            },
            {
              description:
                'wallet_connectors.xdefi.extension.step2.description',
              step: 'create',
              title: 'wallet_connectors.xdefi.extension.step2.title',
            },
            {
              description:
                'wallet_connectors.xdefi.extension.step3.description',
              step: 'refresh',
              title: 'wallet_connectors.xdefi.extension.step3.title',
            },
          ],
        },
      },
    }),
  };
};
