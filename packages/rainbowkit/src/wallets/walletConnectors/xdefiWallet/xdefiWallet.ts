/* eslint-disable sort-keys-fix/sort-keys-fix */
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
  shimDisconnect?: boolean;
}

export const xdefiWallet = ({
  chains,
  shimDisconnect,
}: XDEFIWalletOptions): Wallet => {
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
          shimDisconnect,
          //@ts-ignore
          getProvider: () => {
            return new Promise(resolve => {
              setTimeout(() => {
                const res =
                  typeof window !== 'undefined' &&
                  typeof window?.xfi !== 'undefined'
                    ? (window.xfi?.ethereum as any)
                    : undefined;
                resolve(res);
              }, 0);
            });
          },
        },
      }),
    }),
  };
};
