import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type BitverseWalletOptions = DefaultWalletOptions;

export const bitverseWallet = ({
  projectId,
  walletConnectParameters,
}: BitverseWalletOptions): Wallet => ({
  id: 'bitverse',
  name: 'Bitverse Wallet',
  iconUrl: async () => (await import('./bitverseWallet.svg')).default,
  iconBackground: '#171728',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.bitverse.app&pli=1',
    ios: 'https://apps.apple.com/us/app/bitverse-discover-web3-wealth/id1645515614',
    qrCode: 'https://www.bitverse.zone/download',
  },
  mobile: {
    getUri: (uri: string) =>
      `bitverseapp://open/wallet/wc?uri=${encodeURIComponent(uri)}`,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://www.bitverse.zone',
      steps: [
        {
          description: 'wallet_connectors.bitverse.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.bitverse.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.bitverse.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.bitverse.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.bitverse.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.bitverse.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
