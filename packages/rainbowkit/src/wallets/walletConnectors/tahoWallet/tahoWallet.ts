import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface InjectedWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

declare global {
  interface Window {
    tally: any;
  }
}

export const tahoWallet = ({
  chains,
  shimDisconnect,
}: InjectedWalletOptions): Wallet => ({
  createConnector: () => {
    return {
      connector: new InjectedConnector({
        chains,
        options: {
          getProvider() {
            const getTaho = (tally?: any) =>
              tally?.isTally ? tally : undefined;
            if (typeof window === 'undefined') return;
            return getTaho(window.tally);
          },
          name: 'Taho',
          shimDisconnect,
        },
      }),
    };
  },
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd',
  },
  iconBackground: '#d08d57',
  iconUrl: async () => (await import('./tahoWallet.svg')).default,
  id: 'taho',
  installed:
    typeof window !== 'undefined' &&
    typeof window.tally !== 'undefined' &&
    Boolean(window['tally'])
      ? true
      : false,
  name: 'Taho',
});
