import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface ZerionWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface ZerionWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const zerionWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: (ZerionWalletOptions | ZerionWalletLegacyOptions) &
  InjectedConnectorOptions): Wallet => {
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
    iconBackground: '#2962ef',
    installed: !shouldUseWalletConnect ? isZerionInjected : undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=io.zerion.android',
      ios: 'https://apps.apple.com/app/apple-store/id1456732565',
      mobile: 'https://link.zerion.io/pt3gdRP0njb',
      qrCode: 'https://link.zerion.io/pt3gdRP0njb',
      chrome:
        'https://chrome.google.com/webstore/detail/klghhnkeealcohjjanjjdaeeggmfmlpl',
      browserExtension: 'https://zerion.io/extension',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            version: walletConnectVersion,
            options: walletConnectOptions,
          })
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
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isIOS() ? `zerion://wc?uri=${encodeURIComponent(uri)}` : uri;
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
                      'wallet_connectors.zerion.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.zerion.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.zerion.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.zerion.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.zerion.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.zerion.qr_code.step3.title',
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
                  'wallet_connectors.zerion.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.zerion.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.zerion.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.zerion.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.zerion.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.zerion.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
