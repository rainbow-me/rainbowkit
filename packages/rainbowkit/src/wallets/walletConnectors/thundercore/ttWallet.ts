import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import {
  getWalletConnectConnector,
  WalletConnectConnectorOptions,
} from '../../getWalletConnectConnector';

export interface ttWalletOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: string;
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const ttWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: ttWalletOptions & InjectedConnectorOptions): Wallet => {
  const isTTWalletInjected =
    typeof window !== 'undefined' &&
    ((typeof window.ethereum !== 'undefined' &&
      // @ts-expect-error
      typeof window.thunder !== 'undefined') ||
      (typeof window.ethereum !== 'undefined' && window.ethereum.isTTWallet));

  const shouldUseWalletConnect = !isTTWalletInjected;

  return {
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
              getProvider: () =>
                typeof window !== 'undefined'
                  ? // @ts-expect-error
                    window.ethereum || window.web3 || window.thunder
                  : undefined,
            },
            version: walletConnectVersion,
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return isIOS()
          ? `https://ttlink.site/wc?uri=${encodeURIComponent(uri)}`
          : uri;
      };

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: getUri,
            }
          : undefined,
      };
    },
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.thundercore.mobile&amp;hl=en',
      ios: 'https://apps.apple.com/us/app/thundercore-hub/id1471222243',
      qrCode: 'http://ttlink.site',
    },
    iconAccent: '#000',
    iconBackground: '#000',
    iconUrl: async () => (await import('./ttWallet.svg')).default,
    id: 'ttWallet',
    name: 'TT Wallet',
  };
};
