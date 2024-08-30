import type { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions } from './../../Wallet';

export type UniswapWalletOptions = DefaultWalletOptions;

export const uniswapWallet = ({
  projectId,
  walletConnectParameters,
}: UniswapWalletOptions): Wallet => ({
  id: 'uniswap',
  name: 'Uniswap Wallet',
  iconUrl: async () => (await import('./uniswapWallet.svg')).default,
  iconBackground: '#FFD8EA',
  downloadUrls: {
    ios: 'https://apps.apple.com/app/apple-store/id6443944476',
    mobile: 'https://wallet.uniswap.org/',
    qrCode: 'https://wallet.uniswap.org/',
  },

  mobile: {
    getUri: (uri: string) => {
      return `uniswap://wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://wallet.uniswap.org/',
      steps: [
        {
          description: 'wallet_connectors.uniswap.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.uniswap.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.uniswap.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.uniswap.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.uniswap.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.uniswap.qr_code.step3.title',
        },
      ],
    },
  },

  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
