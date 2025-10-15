import { isAndroid } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type ReadyWalletOptions = DefaultWalletOptions;

export const readyWallet = ({
  projectId,
  walletConnectParameters,
}: ReadyWalletOptions): Wallet => ({
  id: 'ready',
  name: 'Ready',
  iconUrl: async () => (await import('./readyWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=im.argent.contractwalletclient',
    ios: 'https://apps.apple.com/us/app/argent/id1358741926',
    mobile: 'https://www.ready.co/app',
    qrCode: 'https://www.ready.co/app',
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
      learnMoreUrl: 'https://www.ready.co/',
      steps: [
        {
          description: 'wallet_connectors.ready.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.ready.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.ready.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.ready.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.ready.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.ready.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
