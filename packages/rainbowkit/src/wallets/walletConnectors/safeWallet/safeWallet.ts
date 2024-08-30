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
    // We're opting not to provide a download prompt if the application is not
    // already running as a Safe App within the context of the Safe browser,
    // since it's unlikely to be a desired behavior for users.
  },
  createConnector: (walletDetails: WalletDetailsParams) => {
    return createConnector((config) => ({
      ...safe()(config),
      ...walletDetails,
    }));
  },
});
