import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { RainbowPassKeyWallet } from '../../../connectors/RainbowPassKeyWallet/RainbowPassKeyWallet';
import { Wallet } from '../../Wallet';

export interface PassKeyOptions {
  chains: Chain[];
}

export const rainbowPassKeyWallet = ({ chains }: PassKeyOptions): Wallet => {
  return {
    id: 'passkey',
    name: 'PassKey',
    iconUrl: async () => (await import('./rainbowPassKeyWallet.svg')).default,
    iconBackground: 'transparent',
    installed: true,
    createConnector: () => ({
      connector: new RainbowPassKeyWallet({
        chains,
        options: {},
      }),
    }),
  };
};
