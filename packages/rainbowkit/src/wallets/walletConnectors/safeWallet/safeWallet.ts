import { createConnector } from 'wagmi';
import { safe } from 'wagmi/connectors';
import type { Wallet, WalletDetailsParams } from '../../Wallet';

export const safeWallet = (): Wallet => ({
  id: 'safe',
  name: 'Safe',
  iconAccent: '#12ff80',
  iconBackground: '#fff',
  iconUrl: async () => (await import('./safeWallet.svg')).default,
  installed:
    // Only allowed in iframe context
    // borrowed from wagmi safe connector
    !(typeof window === 'undefined') && window?.parent !== window,
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=io.gnosis.safe&hl=en_US',
    ios: 'https://apps.apple.com/us/app/safe-wallet/id1515759131',
    desktop: 'https://app.safe.global/',
  },
  mobile: {
    getUri: (uri: string) =>
      `https://app.safe.global/wc?uri=${encodeURIComponent(uri)}`,
  },
  createConnector: (walletDetails: WalletDetailsParams) => {
    return createConnector((config) => ({
      ...safe()(config),
      ...walletDetails,
    }));
  },
});
