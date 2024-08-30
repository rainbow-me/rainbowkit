import type { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions } from './../../Wallet';

export type KrakenWalletOptions = DefaultWalletOptions;

export const krakenWallet = ({
  projectId,
  walletConnectParameters,
}: KrakenWalletOptions): Wallet => ({
  id: 'kraken',
  name: 'Kraken Wallet',
  iconUrl: async () => (await import('./krakenWallet.svg')).default,
  iconBackground: '#FFD8EA',
  downloadUrls: {
    ios: 'https://apps.apple.com/us/app/kraken-wallet/id1626327149',
    mobile: 'https://kraken.com/wallet',
    qrCode: 'https://kraken.com/wallet',
  },

  mobile: {
    getUri: (uri: string) => {
      return `krakenwallet://wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://kraken.com/wallet',
      steps: [
        {
          description: 'wallet_connectors.kraken.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.kraken.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.kraken.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.kraken.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.kraken.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.kraken.qr_code.step3.title',
        },
      ],
    },
  },

  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
