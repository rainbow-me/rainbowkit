import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { RainbowGoogleWallet } from '../../../connectors/RainbowGoogleWallet/RainbowGoogleWallet';
import { Wallet } from '../../Wallet';

export interface GoogleWalletOptions {
  chains: Chain[];
}

export const rainbowGoogleWallet = ({
  chains,
}: GoogleWalletOptions): Wallet => {
  return {
    id: 'google',
    name: 'Google',
    iconUrl: async () => (await import('./rainbowGoogleWallet.svg')).default,
    iconBackground: 'transparent',
    installed: true,
    createConnector: () => ({
      connector: new RainbowGoogleWallet({
        chains,
        options: {},
      }),
    }),
  };
};
