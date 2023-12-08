import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { RainbowFacebookWallet } from '../../../connectors/RainbowFacebookWallet/RainbowFacebookWallet';
import { Wallet } from '../../Wallet';

export interface FacebookOptions {
  chains: Chain[];
}

export const rainbowFacebookWallet = ({ chains }: FacebookOptions): Wallet => {
  return {
    id: 'facebook',
    name: 'Facebook',
    iconUrl: async () => (await import('./rainbowFacebookWallet.svg')).default,
    iconBackground: 'transparent',
    installed: true,
    createConnector: () => ({
      connector: new RainbowFacebookWallet({
        chains,
        options: {},
      }),
    }),
  };
};
