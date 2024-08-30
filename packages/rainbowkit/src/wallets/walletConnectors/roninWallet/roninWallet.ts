import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type RoninWalletOptions = DefaultWalletOptions;

export const roninWallet = ({
  projectId,
  walletConnectParameters,
}: RoninWalletOptions): Wallet => {
  const isRoninInjected = hasInjectedProvider({
    namespace: 'ronin.provider',
  });

  const shouldUseWalletConnect = !isRoninInjected;

  const getUri = (uri: string) => {
    return `roninwallet://wc?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'ronin',
    name: 'Ronin Wallet',
    iconUrl: async () => (await import('./roninWallet.svg')).default,
    iconBackground: '#ffffff',
    rdns: 'com.roninchain.wallet',
    installed: isRoninInjected || undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.skymavis.genesis',
      ios: 'https://apps.apple.com/us/app/ronin-wallet/id1592675001',
      mobile: 'https://wallet.roninchain.com',
      chrome:
        'https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/ronin-wallet/kjmoohlgokccodicjjfebfomlbljgfhk',
      firefox: 'https://addons.mozilla.org/firefox/addon/ronin-wallet',
      browserExtension: 'https://wallet.roninchain.com/',
      qrCode: 'https://wallet.roninchain.com/',
    },
    mobile: {
      getUri: shouldUseWalletConnect ? getUri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://wallet.roninchain.com/',
            steps: [
              {
                description:
                  'wallet_connectors.ronin.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.ronin.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.ronin.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.ronin.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.ronin.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.ronin.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://wallet.roninchain.com/',
        steps: [
          {
            description: 'wallet_connectors.ronin.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.ronin.extension.step1.title',
          },
          {
            description: 'wallet_connectors.ronin.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.ronin.extension.step2.title',
          },
          {
            description: 'wallet_connectors.ronin.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.ronin.extension.step3.title',
          },
        ],
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({ namespace: 'ronin.provider' }),
  };
};
