import type { InjectedConnectorOptions } from '@wagmi/core';
import { InjectedConnector } from 'wagmi/connectors/injected';
import type { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

declare global {
  interface Window {
    frontier: any;
  }
}

export interface FrontierWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface FrontierWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const frontierWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: (FrontierWalletLegacyOptions | FrontierWalletOptions) &
  InjectedConnectorOptions): Wallet => {
  const isFrontierInjected =
    typeof window !== 'undefined' &&
    typeof window.frontier !== 'undefined' &&
    window?.frontier?.ethereum?.isFrontier;
  return {
    id: 'frontier',
    name: 'Frontier Wallet',
    installed:
      typeof window !== 'undefined' &&
      typeof window.frontier !== 'undefined' &&
      window?.frontier?.ethereum?.isFrontier
        ? true
        : undefined,
    iconUrl: async () => (await import('./frontierWallet.svg')).default,
    iconBackground: '#CC703C',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.frontierwallet',
      ios: 'https://apps.apple.com/us/app/frontier-crypto-defi-wallet/id1482380988',
      qrCode: 'https://www.frontier.xyz/download',
      chrome:
        'https://chrome.google.com/webstore/detail/frontier-wallet/kppfdiipphfccemcignhifpjkapfbihd',
      browserExtension: 'https://www.frontier.xyz/download',
    },
    createConnector: () => {
      const shouldUseWalletConnect = !isFrontierInjected;
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            projectId,
            options: walletConnectOptions,
            version: walletConnectVersion,
          })
        : new InjectedConnector({ chains });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid()
          ? `frontier://wc?uri=${encodeURIComponent(uri)}`
          : uri;
      };
      return {
        connector: new InjectedConnector({
          chains,
          options: {
            getProvider: () => {
              const getFront = (frontier?: any) =>
                frontier?.ethereum ? frontier?.ethereum : undefined;
              if (typeof window === 'undefined') return;
              return getFront(window.frontier);
            },
            ...options,
          },
        }),
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl: 'https://help.frontier.xyz/en/',
                steps: [
                  {
                    description:
                      'wallet_connectors.im_token.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.im_token.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.im_token.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.im_token.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.im_token.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.im_token.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl:
              'https://help.frontier.xyz/en/articles/6967236-setting-up-frontier-on-your-device',
            steps: [
              {
                description:
                  'wallet_connectors.frontier.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.frontier.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.frontier.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.frontier.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.frontier.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.frontier.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
