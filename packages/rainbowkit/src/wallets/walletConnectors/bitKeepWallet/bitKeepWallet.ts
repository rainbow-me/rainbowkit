/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface BitKeepWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '2';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface BitKeepWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const bitKeepWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: (BitKeepWalletLegacyOptions | BitKeepWalletOptions) &
  InjectedConnectorOptions): Wallet => {
  // Not using the explicit isBitKeep fn to check for bitKeep
  // so that users can continue to use the bitKeep button
  // to interact with wallets compatible with window.ethereum.
  // The connector's getProvider will instead favor the real bitKeep

  const isBitKeepInjected =
    typeof window !== 'undefined' &&
    (window as any).bitkeep !== undefined &&
    ((window as any).bitkeep as any)?.ethereum !== undefined &&
    ((window as any).bitkeep as any).isBitKeep === true;

  const shouldUseWalletConnect = !isBitKeepInjected;

  return {
    id: 'bitKeep',
    name: 'BitKeep',
    iconUrl: 'https://bitkeep.com/favicon.ico',
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    downloadUrls: {
      android: 'https://bitkeep.com/en/download?type=2',
      browserExtension:
        'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak',
      chrome:
        'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak',
      ios: 'https://apps.apple.com/app/bitkeep/id1395301115',
      mobile: 'https://bitkeep.com/en/download?type=2',
      qrCode: 'https://bitkeep.com/en/download',
    },

    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            options: walletConnectOptions,
            projectId,
            version: walletConnectVersion,
          })
        : new InjectedConnector({
            chains,
            options: {
              // @ts-expect-error
              getProvider: () => window.bitkeep.ethereum,
              ...options,
            },
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return isAndroid()
          ? uri
          : `bitkeep://wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://study.bitkeep.com',
            steps: [
              {
                description:
                  'We recommend pinning BitKeep to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the BitKeep extension',
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
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl: 'https://study.bitkeep.com',
                steps: [
                  {
                    description:
                      'We recommend putting BitKeep on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the BitKeep app',
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
      };
    },
  };
};
