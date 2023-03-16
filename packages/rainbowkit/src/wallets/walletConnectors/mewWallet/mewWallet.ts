/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { detectProviderFlag } from '../../detectProviderFlag';

export interface MewWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const mewWallet = ({
  chains,
  shimDisconnect,
}: MewWalletOptions): Wallet => {
  return {
    id: 'mew',
    name: 'MEW wallet',
    iconUrl: async () => (await import('./mewWallet.svg')).default,
    iconBackground: '#fff',
    installed: detectProviderFlag('isMEWwallet'),
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow',
      ios: 'https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow',
      qrCode: 'https://www.mewwallet.com/',
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector({
          chains,
          options: { shimDisconnect },
        }),
      };
    },
  };
};
