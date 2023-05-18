/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

declare global {
  interface Window {
    frontier: any;
  }
}
export interface FrontierWalletOptions {
  chains: Chain[];
}

export const frontierWallet = ({
  chains,
  ...options
}: FrontierWalletOptions): Wallet => {
  // `isFrontier` needs to be added to the wagmi `Ethereum` object
  return {
    id: 'frontier',
    name: 'Frontier Wallet',
    installed:
      typeof window !== 'undefined' &&
      typeof window.frontier !== 'undefined' &&
      window?.frontier?.ethereum?.isFrontier
        ? true
        : undefined,
    iconUrl: async () => (await import('./frontierWallet.svg')).default,
    iconBackground: '#CC703C',
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/frontier-wallet/kppfdiipphfccemcignhifpjkapfbihd',
      android:
        'https://play.google.com/store/apps/details?id=com.frontierwallet',
      ios: 'https://apps.apple.com/us/app/frontier-crypto-defi-wallet/id1482380988',
      qrCode: 'https://www.frontier.xyz/download',
    },
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: {
          getProvider: () => {
            const getFront = (frontier?: any) =>
              frontier?.ethereum ? frontier?.ethereum : undefined;
            if (typeof window === 'undefined') return;
            return getFront(window.frontier);
          },
          ...options,
        },
      }),
    }),
  };
};
