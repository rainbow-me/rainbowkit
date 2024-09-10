import { isAndroid } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type BinanceWalletOptions = DefaultWalletOptions;

export const binanceWallet = ({
  projectId,
  walletConnectParameters,
}: BinanceWalletOptions): Wallet => ({
  id: 'binance',
  name: 'Binance Wallet',
  iconUrl: async () => (await import('./binanceWallet.svg')).default,
  iconBackground: '#000000',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.binance.dev',
    ios: 'https://apps.apple.com/us/app/id1436799971',
    mobile: 'https://www.binance.com/en/download',
    qrCode: 'https://www.binance.com/en/web3wallet',
  },
  mobile: {
    getUri: (uri: string) => {
      return isAndroid()
        ? uri
        : `bnc://app.binance.com/cedefi/wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://www.binance.com/en/web3wallet',
      steps: [
        {
          description: 'wallet_connectors.binance.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.binance.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.binance.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.binance.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.binance.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.binance.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
