import { Wallet } from '../../Wallet';
import TallyHoConnector from './tallyHoConnector';
import { TallyHoWalletOptions } from './types';

export const tallyHoWallet = ({
  chains,
  shimDisconnect,
}: TallyHoWalletOptions): Wallet => ({
  createConnector: () => {
    return {
      connector: new TallyHoConnector({
        chains,
        options: { shimDisconnect },
      }),
    };
  },
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/tally-ho/eajafomhmkipbjmfmhebemolkcicgfmd',
  },
  iconBackground: '#d08d57',
  iconUrl: async () => (await import('./tallyHoWallet.svg')).default,
  id: 'tallyHoWallet',
  installed: true,
  name: 'Tally Ho Wallet',
});
