import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { RainbowTwitterWallet } from '../../../connectors/RainbowTwitterWallet/RainbowTwitterWallet';
import { Wallet } from '../../Wallet';

export interface TwitterOptions {
  chains: Chain[];
}

export const rainbowTwitterWallet = ({ chains }: TwitterOptions): Wallet => {
  return {
    id: 'twitter',
    name: 'Twitter',
    iconUrl: async () => (await import('./rainbowTwitterWallet.svg')).default,
    iconBackground: 'transparent',
    installed: true,
    createConnector: () => ({
      connector: new RainbowTwitterWallet({
        chains,
        options: {},
      }),
    }),
  };
};
