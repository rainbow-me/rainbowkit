/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
export interface MewWalletOptions {
  chains: Chain[];
}

export const mewWallet = ({
  chains,
  ...options
}: MewWalletOptions & InjectedConnectorOptions): Wallet => {
  const isMewWalletInjected =
    typeof window !== 'undefined' &&
    Boolean(
      (
        window.ethereum as typeof window.ethereum &
          (undefined | { isMEWwallet?: boolean })
      )?.isMEWwallet
    );
  return {
    id: 'mew',
    name: 'MEW wallet',
    iconUrl: async () => (await import('./mewWallet.svg')).default,
    iconBackground: '#fff',
    installed: isMewWalletInjected,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow',
      ios: 'https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow',
      mobile: 'https://mewwallet.com',
      qrCode: 'https://mewwallet.com',
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector({
          chains,
          options,
        }),
      };
    },
  };
};
