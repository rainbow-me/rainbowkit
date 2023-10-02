import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { WalletConnectConnectorOptions } from '../../getWalletConnectConnector';

export interface FoxWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const foxWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: FoxWalletOptions & InjectedConnectorOptions): Wallet => {
  const isFoxInjected =
    typeof window !== 'undefined' &&
    // @ts-expect-error
    typeof window.foxwallet !== 'undefined';

  const shouldUseWalletConnect = !isFoxInjected;

  return {
    id: 'foxwallet',
    name: 'FoxWallet',
    iconUrl: async () => (await import('./foxWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.foxwallet.play',
      ios: 'https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231',
      qrCode: 'https://foxwallet.com/download',
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
              // @ts-expect-error
              getProvider: () => window.foxwallet.ethereum,
              ...options,
            },
          });

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect
            ? async () => {
                const uri = await getWalletConnectUri(
                  connector,
                  walletConnectVersion,
                );
                return `foxwallet://wc?uri=${encodeURIComponent(uri)}`;
              }
            : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl: 'https://foxwallet.com',
                steps: [
                  {
                    description:
                      'wallet_connectors.fox.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.fox.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.fox.qr_code.step2.description',

                    step: 'create',
                    title: 'wallet_connectors.fox.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.fox.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.fox.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};
