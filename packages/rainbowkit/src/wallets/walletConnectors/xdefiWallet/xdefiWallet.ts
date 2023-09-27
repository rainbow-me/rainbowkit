import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { translateWithLocaleLocalStorage } from '../../../locales';
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
              description: translateWithLocaleLocalStorage(
                'wallet_connectors.extension.xdefi.step1.description'
              ),
              step: 'install',
              title: translateWithLocaleLocalStorage(
                'wallet_connectors.extension.xdefi.step1.title'
              ),
            },
            {
              description: translateWithLocaleLocalStorage(
                'wallet_connectors.extension.xdefi.step2.description'
              ),
              step: 'create',
              title: translateWithLocaleLocalStorage(
                'wallet_connectors.extension.xdefi.step2.title'
              ),
            },
            {
              description: translateWithLocaleLocalStorage(
                'wallet_connectors.extension.xdefi.step3.description'
              ),
              step: 'refresh',
              title: translateWithLocaleLocalStorage(
                'wallet_connectors.extension.xdefi.step3.title'
              ),
            },
          ],
        },
      },
    }),
  };
};
