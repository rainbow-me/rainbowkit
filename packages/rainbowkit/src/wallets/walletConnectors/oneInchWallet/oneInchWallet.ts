import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type OneInchWalletOptions = DefaultWalletOptions;

export const oneInchWallet = ({
  projectId,
  walletConnectParameters,
}: OneInchWalletOptions): Wallet => ({
  id: '1inch',
  name: '1inch Wallet',
  iconUrl: async () => (await import('./oneInchWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=io.oneinch.android',
    ios: 'https://apps.apple.com/us/app/1inch-crypto-defi-wallet/id1546049391',
    mobile: 'https://1inch.io/wallet',
    qrCode: 'https://1inch.io/wallet',
  },
  mobile: {
    getUri: (uri: string) => `oneinch://wc?uri=${encodeURIComponent(uri)}`,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://1inch.io/wallet',
      steps: [
        {
          description: 'wallet_connectors.1inch.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.1inch.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.1inch.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.1inch.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.1inch.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.1inch.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
