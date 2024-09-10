import { isAndroid } from '../../../utils/isMobile';
import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import { getInjectedConnector } from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type IoPayWalletOptions = DefaultWalletOptions;

function isIoPayMobile(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.userAgent !== 'undefined' &&
    (navigator?.userAgent.includes('IoPayAndroid') ||
      navigator?.userAgent.includes('IoPayiOs'))
  );
}

export const iopayWallet = ({
  projectId,
  walletConnectParameters,
}: IoPayWalletOptions): Wallet => ({
  id: 'iopay',
  name: 'ioPay Wallet',
  iconUrl: async () => (await import('./iopayWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=io.iotex.iopay.gp&pli=1',
    ios: 'https://apps.apple.com/us/app/iopay-multichain-crypto-wallet/id1478086371',
    qrCode: 'https://iopay.me/',
    browserExtension: 'https://iopay.me/',
  },
  mobile: {
    getUri: (uri: string) => {
      return isAndroid() ? uri : `iopay://wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
    instructions: {
      learnMoreUrl: 'https://iopay.me/',
      steps: [
        {
          description: 'wallet_connectors.iopay.qr_code.step1.description',
          step: 'install',
          title: 'wallet_connectors.iopay.qr_code.step1.title',
        },
        {
          description: 'wallet_connectors.iopay.qr_code.step2.description',
          step: 'create',
          title: 'wallet_connectors.iopay.qr_code.step2.title',
        },
        {
          description: 'wallet_connectors.iopay.qr_code.step3.description',
          step: 'scan',
          title: 'wallet_connectors.iopay.qr_code.step3.title',
        },
      ],
    },
  },
  createConnector: isIoPayMobile()
    ? getInjectedConnector({})
    : getWalletConnectConnector({
        projectId,
        walletConnectParameters,
      }),
});
