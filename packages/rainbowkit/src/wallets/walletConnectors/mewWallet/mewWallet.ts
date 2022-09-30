/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface MewWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const mewWallet = ({
  chains,
  shimDisconnect,
}: MewWalletOptions): Wallet => ({
  id: 'mewWallet',
  name: 'MEW wallet',
  iconUrl: async () => (await import('./mewWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow',
    ios: 'https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow',
  },
  createConnector: () => {
    const isMewWalletInjected =
      typeof window !== 'undefined' &&
      Boolean(
        (
          window.ethereum as typeof window.ethereum &
            (undefined | { isMEWwallet?: boolean })
        )?.isMEWwallet
      );

    if (isMewWalletInjected) {
      return {
        connector: new InjectedConnector({
          chains,
          options: { shimDisconnect },
        }),
      };
    }

    const connector = getWalletConnectConnector({ chains });

    return {
      connector,
      desktop: {
        getUri: async () => {
          return 'https://download.mewwallet.com?source=rainbow';
        },
      },
      mobile: {
        getUri: async () => {
          return 'https://download.mewwallet.com?source=rainbow';
        },
      },
    };
  },
});
