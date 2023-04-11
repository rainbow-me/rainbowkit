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
      browserExtension:
        'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
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
    }),
  };
};
