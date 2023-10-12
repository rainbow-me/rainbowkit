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

export interface BitgetWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface BitgetWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

/**
 * @deprecated `BitKeepWalletLegacyOptions` is now `BitgetWalletLegacyOptions`
 */
export interface BitKeepWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

/**
 * @deprecated `BitKeepWalletOptions` is now `BitgetWalletOptions`
 */
export interface BitKeepWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const bitgetWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: (
  | BitgetWalletLegacyOptions
  | BitgetWalletOptions
  | BitKeepWalletLegacyOptions
  | BitKeepWalletOptions
) &
  InjectedConnectorOptions): Wallet => {
  const isBitKeepInjected =
    typeof window !== 'undefined' &&
    // @ts-expect-error
    window.bitkeep !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum !== undefined &&
    // @ts-expect-error
    window.bitkeep.ethereum.isBitKeep === true;

  const shouldUseWalletConnect = !isBitKeepInjected;

  return {
    id: 'bitget',
    name: 'Bitget Wallet',
    iconUrl: async () => (await import('./bitgetWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    downloadUrls: {
      android: 'https://web3.bitget.com/en/wallet-download?type=0',
      ios: 'https://apps.apple.com/app/bitkeep/id1395301115',
      mobile: 'https://web3.bitget.com/en/wallet-download?type=2',
      qrCode: 'https://web3.bitget.com/en/wallet-download',
      chrome:
        'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak',
      browserExtension: 'https://web3.bitget.com/en/wallet-download',
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
            learnMoreUrl: 'https://web3.bitget.com/en/academy',
            steps: [
              {
                description:
                  'wallet_connectors.bitget.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.bitget.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.bitget.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.bitget.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.bitget.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.bitget.extension.step3.description',
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
                learnMoreUrl: 'https://web3.bitget.com/en/academy',
                steps: [
                  {
                    description:
                      'wallet_connectors.bitget.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.bitget.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.bitget.qr_code.step2.description',

                    step: 'create',
                    title: 'wallet_connectors.bitget.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.bitget.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.bitget.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};

/**
 * @deprecated `bitKeepWallet` is now `bitgetWallet`
 */
export const bitKeepWallet = bitgetWallet;
