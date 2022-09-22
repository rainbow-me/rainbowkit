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
  name: 'MEW Wallet',
  iconUrl: async () => (await import('./mewWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&hl=en_US&gl=US',
    ios: 'https://apps.apple.com/us/app/mew-wallet-ethereum-defi-web3/id1464614025',
  },
  createConnector: () => {
    const inAppBrowser = Boolean(
      typeof window !== 'undefined' && window.ethereum?.isMEWwallet
    );

    if (inAppBrowser) {
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
    };
  },
});
