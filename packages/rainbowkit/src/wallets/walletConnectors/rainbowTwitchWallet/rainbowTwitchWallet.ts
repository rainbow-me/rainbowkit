import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { RainbowTwitchWallet } from '../../../connectors/RainbowTwitchWallet/RainbowTwitchWallet';
import { Wallet } from '../../Wallet';

export interface TwitchOptions {
  chains: Chain[];
}

export const rainbowTwitchWallet = ({ chains }: TwitchOptions): Wallet => {
  return {
    id: 'twitch',
    name: 'Twitch',
    iconUrl: async () => (await import('./rainbowTwitchWallet.svg')).default,
    iconBackground: 'transparent',
    installed: true,
    createConnector: () => ({
      connector: new RainbowTwitchWallet({
        chains,
        options: {},
      }),
    }),
  };
};
