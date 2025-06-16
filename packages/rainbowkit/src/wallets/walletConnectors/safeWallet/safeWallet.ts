import { createConnector } from 'wagmi';
import { safe } from 'wagmi/connectors';
import type {
  DefaultWalletOptions,
  Wallet,
  WalletDetailsParams,
} from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export const safeWallet = ({
  projectId,
  walletConnectParameters,
}: DefaultWalletOptions): Wallet => {
  // Only allowed in iframe context
  // borrowed from wagmi safe connector
  const isIframe =
    !(typeof window === 'undefined') && window?.parent !== window;
  const shouldUseWalletConnect = !isIframe;

  return {
    id: 'safe',
    name: 'Safe',
    iconAccent: '#12ff80',
    iconBackground: '#fff',
    iconUrl: async () => (await import('./safeWallet.svg')).default,
    installed: !shouldUseWalletConnect ? isIframe : undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=io.gnosis.safe&hl=en_US',
      ios: 'https://apps.apple.com/us/app/safe-wallet/id1515759131',
      desktop: 'https://app.safe.global',
    },
    mobile: {
      getUri: (uri: string) => uri,
    },
    qrCode: {
      getUri: (uri: string) => uri,
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : (walletDetails: WalletDetailsParams) => {
          return createConnector((config) => ({
            ...safe()(config),
            ...walletDetails,
          }));
        },
  };
};
