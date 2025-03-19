import { isIOS } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { DefaultWalletOptions } from '../../Wallet';

export type XPortalWalletOptions = DefaultWalletOptions;

export const xPortalWallet = ({
  projectId,
  walletConnectParameters,
}: XPortalWalletOptions): Wallet => {
  const isXPortalInjected = hasInjectedProvider({
    namespace: 'xPortalWallet',
    flag: 'isPortal',
  });
  const shouldUseWalletConnect = !isXPortalInjected;

  const getUri = (uri: string) => {
    return isIOS() ? `xportal://wc?uri=${encodeURIComponent(uri)}` : uri;
  };

  return {
    id: 'xportal',
    name: 'xPortal',
    rdns: 'com.elrond.maiar.wallet',
    iconUrl: async () => (await import('./xPortalWallet.svg')).default,
    iconAccent: '#23f7dd',
    iconBackground: '#23f7dd',
    installed: !shouldUseWalletConnect ? isXPortalInjected : undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.elrond.maiar.wallet',
      ios: 'https://apps.apple.com/us/app/xportal-btc-crypto-wallet/id1519405832',
    },
    mobile: {
      getUri: shouldUseWalletConnect ? getUri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri,
          instructions: {
            learnMoreUrl:
              'https://xportal.io/blog/announcing-the-xportal-smart-wallet/',
            steps: [
              {
                description:
                  'wallet_connectors.xportal.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.xportal.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.xportal.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.xportal.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.xportal.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.xportal.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://help.xportal.io/en/',
        steps: [
          {
            description: 'wallet_connectors.xportal.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.xportal.extension.step1.title',
          },
          {
            description: 'wallet_connectors.xportal.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.xportal.extension.step2.title',
          },
          {
            description: 'wallet_connectors.xportal.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.xportal.extension.step3.title',
          },
        ],
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          namespace: 'xPortalWallet',
          flag: 'isPortal',
        }),
  };
};
