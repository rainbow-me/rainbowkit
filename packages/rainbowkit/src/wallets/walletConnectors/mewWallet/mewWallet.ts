/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
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
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid()
            ? uri
            : `https://mewwallet.com/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: 'https://www.mewwallet.com/what-is-ethereum/',
          steps: [
            {
              description:
                'Put MEW wallet on your home screen for faster access.',
              step: 'install',
              title: 'Open the MEW wallet app',
            },
            {
              description: 'Create a new wallet or import an existing one.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Tap the camera icon, scan the QR code,  and confirm the prompt to connect.',
              step: 'scan',
              title: 'Tap the QR scan icon in Home',
            },
          ],
        },
      },
    };
  },
});
