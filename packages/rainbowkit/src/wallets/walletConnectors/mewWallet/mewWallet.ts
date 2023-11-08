import { Wallet } from '../../Wallet';
import { getDefaultInjectedConnector } from '../../getInjectedConnector';

export const mewWallet = (): Wallet => {
  const isMewWalletInjected =
    typeof window !== 'undefined' &&
    Boolean(
      (
        window.ethereum as typeof window.ethereum &
          (undefined | { isMEWwallet?: boolean })
      )?.isMEWwallet,
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
    createConnector: getDefaultInjectedConnector(),
  };
};
