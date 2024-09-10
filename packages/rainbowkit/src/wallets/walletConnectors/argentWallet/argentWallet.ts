import { isAndroid } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type ArgentWalletOptions = DefaultWalletOptions;

export const argentWallet = ({
  projectId,
  walletConnectParameters,
}: ArgentWalletOptions): Wallet => ({
  id: 'argent',
  name: 'Argent',
  iconUrl: async () => (await import('./argentWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=im.argent.contractwalletclient',
    ios: 'https://apps.apple.com/us/app/argent/id1358741926',
    mobile: 'https://argent.xyz/download-argent',
    qrCode: 'https://argent.link/app',
  },
  mobile: {
    getUri: (uri: string) => {
      return isAndroid()
        ? uri
        : `argent://app/wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://argent.xyz/learn/what-is-a-crypto-wallet/',
      steps: [
        {
          description: 'wallet_connectors.argent.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.argent.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.argent.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.argent.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.argent.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.argent.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
