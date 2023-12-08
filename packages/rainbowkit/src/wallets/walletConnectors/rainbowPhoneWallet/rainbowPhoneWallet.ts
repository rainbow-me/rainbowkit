import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { RainbowPhoneWallet } from '../../../connectors/RainbowPhoneWallet/RainbowPhoneWallet';
import { Wallet } from '../../Wallet';

export interface PhoneOptions {
  chains: Chain[];
}

export const rainbowPhoneWallet = ({ chains }: PhoneOptions): Wallet => {
  return {
    id: 'phone',
    name: 'Phone',
    iconUrl: async () => (await import('./rainbowPhoneWallet.svg')).default,
    iconBackground: 'transparent',
    installed: true,
    createConnector: () => ({
      connector: new RainbowPhoneWallet({
        chains,
        options: {},
      }),
    }),
  };
};
