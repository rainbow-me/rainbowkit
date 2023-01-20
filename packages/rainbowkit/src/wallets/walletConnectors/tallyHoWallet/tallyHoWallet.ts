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

export const tallyHoWallet = ({
  chains,
  shimDisconnect,
}: InjectedWalletOptions): Wallet => ({
  createConnector: () => {
    return {
      connector: new InjectedConnector({
        chains,
        options: {
          getProvider() {
            const getTally = (tally?: any) =>
              tally?.isTally ? tally : undefined;
            if (typeof window === 'undefined') return;
            return getTally(window.tally);
          },
          name: 'Tally Ho',
          shimDisconnect,
        },
      }),
    };
  },
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/tally-ho/eajafomhmkipbjmfmhebemolkcicgfmd',
  },
  iconBackground: '#d08d57',
  iconUrl: async () => (await import('./tallyHoWallet.svg')).default,
  id: 'tallyHo',
  installed: true,
  name: 'Tally Ho',
});
