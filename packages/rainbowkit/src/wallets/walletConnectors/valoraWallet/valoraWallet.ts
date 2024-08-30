import { isAndroid } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type ValoraWalletOptions = DefaultWalletOptions;

export const valoraWallet = ({
  projectId,
  walletConnectParameters,
}: ValoraWalletOptions): Wallet => ({
  id: 'valora',
  name: 'Valora',
  iconUrl: async () => (await import('./valoraWallet.svg')).default,
  iconBackground: '#FFFFFF',
  downloadUrls: {
    ios: 'https://apps.apple.com/app/id1520414263?mt=8',
    android: 'https://play.google.com/store/apps/details?id=co.clabs.valora',
    mobile: 'https://valora.xyz',
    qrCode: 'https://valora.xyz',
  },
  mobile: {
    getUri: (uri: string) =>
      isAndroid() ? uri : `celo://wallet/wc?uri=${encodeURIComponent(uri)}`,
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://valora.xyz/',
      steps: [
        {
          description: 'wallet_connectors.valora.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.valora.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.valora.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.valora.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.valora.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.valora.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
