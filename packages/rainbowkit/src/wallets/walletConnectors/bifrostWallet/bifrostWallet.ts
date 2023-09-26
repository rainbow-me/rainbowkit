/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { translateWithLocaleLocalStorage } from '../../../locales';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import {
  getWalletConnectConnector,
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';
import { InjectedWalletOptions } from '../injectedWallet/injectedWallet';

export interface BifrostWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface BifrostWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const bifrostWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: (BifrostWalletOptions | BifrostWalletLegacyOptions) &
  InjectedWalletOptions &
  InjectedConnectorOptions): Wallet => {
  const isBifrostInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isBifrost;

  const shouldUseWalletConnect = !isBifrostInjected;

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
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            projectId,
            options: walletConnectOptions,
            version: walletConnectVersion,
          })
        : new InjectedConnector({
            chains,
            options,
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return isAndroid()
          ? uri
          : `https://app.bifrostwallet.com/wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl:
                  'https://support.bifrostwallet.com/en/articles/6886814-how-to-use-walletconnect',
                steps: [
                  {
                    description: translateWithLocaleLocalStorage(
                      'wallet_connectors.qr_code.bifrost.step1.description'
                    ),
                    step: 'install',
                    title: translateWithLocaleLocalStorage(
                      'wallet_connectors.qr_code.bifrost.step1.title'
                    ),
                  },
                  {
                    description: translateWithLocaleLocalStorage(
                      'wallet_connectors.qr_code.bifrost.step2.description'
                    ),
                    step: 'create',
                    title: translateWithLocaleLocalStorage(
                      'wallet_connectors.qr_code.bifrost.step2.title'
                    ),
                  },
                  {
                    description: translateWithLocaleLocalStorage(
                      'wallet_connectors.qr_code.bifrost.step3.description'
                    ),
                    step: 'scan',
                    title: translateWithLocaleLocalStorage(
                      'wallet_connectors.qr_code.bifrost.step3.title'
                    ),
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};
