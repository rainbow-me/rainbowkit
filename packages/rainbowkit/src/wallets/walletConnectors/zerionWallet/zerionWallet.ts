/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface ZerionWalletOptions {
  chains: Chain[];
}

export const zerionWallet = ({
  chains,
  ...options
}: ZerionWalletOptions & InjectedConnectorOptions): Wallet => {
  const isZerionInjected =
    typeof window !== 'undefined' &&
    ((typeof window.ethereum !== 'undefined' && window.ethereum.isZerion) ||
      // @ts-expect-error
      typeof window.zerionWallet !== 'undefined');

  const shouldUseWalletConnect = !isZerionInjected;

  return {
    id: 'zerion',
    name: 'Zerion',
    iconUrl: async () => (await import('./zerionWallet.svg')).default,
    iconAccent: '#2962ef',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isZerionInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/klghhnkeealcohjjanjjdaeeggmfmlpl',
      android:
        'https://play.google.com/store/apps/details?id=io.zerion.android',
      ios: 'https://apps.apple.com/app/apple-store/id1456732565',
      qrCode: 'https://link.zerion.io/pt3gdRP0njb',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
            options: {
              getProvider: () =>
                typeof window !== 'undefined'
                  ? // @ts-expect-error
                    window.zerionWallet || window.ethereum
                  : undefined,
              ...options,
            },
          });

      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return isAndroid()
          ? uri
          : `https://wallet.zerion.io/wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl:
                  'https://zerion.io/blog/announcing-the-zerion-smart-wallet/',
                steps: [
                  {
                    description:
                      'We recommend putting Zerion on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the Zerion app',
                  },
                  {
                    description:
                      'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                    step: 'create',
                    title: 'Create or Import a Wallet',
                  },
                  {
                    description:
                      'After you scan, a connection prompt will appear for you to connect your wallet.',
                    step: 'scan',
                    title: 'Tap the scan button',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl: 'https://help.zerion.io/en/',
            steps: [
              {
                description:
                  'We recommend pinning Zerion to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the Zerion extension',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Refresh your browser',
              },
            ],
          },
        },
      };
    },
  };
};
