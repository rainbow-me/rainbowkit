import { isAndroid } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions } from './../../Wallet';

export type BifrostWalletOptions = DefaultWalletOptions;

export const bifrostWallet = ({
  projectId,
  walletConnectParameters,
}: BifrostWalletOptions): Wallet => {
  const isBifrostInjected = hasInjectedProvider({ flag: 'isBifrost' });

  const shouldUseWalletConnect = !isBifrostInjected;

  const getUri = (uri: string) => {
    return isAndroid()
      ? uri
      : `https://app.bifrostwallet.com/wc?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'bifrostWallet',
    name: 'Bifrost Wallet',
    iconUrl: async () => (await import('./bifrostWallet.svg')).default,
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isBifrostInjected : undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.bifrostwallet.app',
      ios: 'https://apps.apple.com/us/app/bifrost-wallet/id1577198351',
      qrCode: 'https://bifrostwallet.com/#download-app',
    },
    mobile: {
      getUri: shouldUseWalletConnect ? getUri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl:
              'https://support.bifrostwallet.com/en/articles/6886814-how-to-use-walletconnect',
            steps: [
              {
                description:
                  'wallet_connectors.bifrost.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.bifrost.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.bifrost.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.bifrost.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.bifrost.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.bifrost.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,

    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          flag: 'isBifrost',
        }),
  };
};
