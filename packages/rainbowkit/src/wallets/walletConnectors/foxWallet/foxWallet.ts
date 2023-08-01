/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface FoxWalletOptions {
  projectId: string;
  chains: Chain[];
}

export const foxWallet = ({
  chains,
  projectId,
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
    iconAccent: '#000',
    iconBackground: '#000',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.foxwallet.play',
      ios: 'https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231',
      qrCode: 'https://foxwallet.com/download',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ projectId, chains })
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
                const { uri } = (await connector.getProvider()).connector;
                return `https://link.foxwallet.com/wc?uri=${encodeURIComponent(
                  uri
                )}`;
              }
            : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () => (await connector.getProvider()).connector.uri,
              instructions: {
                learnMoreUrl: 'https://foxwallet.com',
                steps: [
                  {
                    description:
                      'We recommend putting FoxWallet on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the FoxWallet app',
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
