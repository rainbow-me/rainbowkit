import type { Wallet } from '../../Wallet';
import type { DefaultWalletOptions } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type ParaSwapWalletOptions = DefaultWalletOptions;

export const paraSwapWallet = ({
  projectId,
  walletConnectParameters,
}: ParaSwapWalletOptions): Wallet => ({
  id: 'paraswap',
  name: 'ParaSwap Wallet',
  iconUrl: async () => (await import('./paraSwapWallet.svg')).default,
  iconBackground: '#578CFC',
  downloadUrls: {
    ios: 'https://apps.apple.com/us/app/paraswap-multichain-wallet/id1584610690',
    mobile: 'https://paraswap.io',
    qrCode: 'https://paraswap.io',
  },
  mobile: {
    getUri: (uri: string) => {
      return `paraswap://wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://paraswap.io',
      steps: [
        {
          description: 'wallet_connectors.paraswap.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.paraswap.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.paraswap.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.paraswap.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.paraswap.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.paraswap.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
