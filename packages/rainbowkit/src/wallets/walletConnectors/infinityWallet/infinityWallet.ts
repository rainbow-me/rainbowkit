/* eslint-disable sort-keys-fix/sort-keys-fix */
import { openInfinityWallet } from '@infinitywallet/infinity-connector';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface InfinityWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const infinityWallet = ({
  chains,
  shimDisconnect,
}: InfinityWalletOptions): Wallet => {
  const isInfinityWalletInjected =
    typeof window !== 'undefined' &&
    Boolean(
      (
        window.ethereum as typeof window.ethereum &
          (undefined | { isInfinityWallet?: boolean })
      )?.isInfinityWallet
    );

  const shouldUseWalletConnect = !isInfinityWalletInjected;

  return {
    id: 'infinityWallet',
    name: 'Infinity Wallet',
    iconUrl: async () => (await import('./infinityWallet.svg')).default,
    iconBackground: '#1d2643',
    installed: !shouldUseWalletConnect ? isInfinityWalletInjected : undefined,
    downloadUrls: {
      browserExtension: 'https://infinitywallet.io/download/',
      qrCode: 'https://infinitywallet.io/download/',
    },
    createConnector: () => {
      if (isInfinityWalletInjected) {
        return {
          connector: new InjectedConnector({
            chains,
            options: { shimDisconnect },
          }),
        };
      }

      const connector = getWalletConnectConnector({ chains });

      return {
        connector,
        mobile: {
          getUri: undefined,
        },
        desktop: {
          getUri: async () => {
            openInfinityWallet(window.location.href, chains);
            return '';
          },
        },
        qrCode: {
          getUri: async () => (await connector.getProvider()).connector.uri,
          instructions: {
            learnMoreUrl: 'https://infinitywallet.io/',
            steps: [
              {
                description:
                  'Open or install the Infinity Wallet, make a shortcut for faster access to your wallet.',
                step: 'install',
                title: 'Open the Infinity Wallet',
              },
              {
                description: 'Create a new wallet or import an existing one.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Accept the prompt to open in Infinity Wallet or Scan the QR code. A connection prompt will appear for you to connect your wallet.',
                step: 'scan',
                title: 'Click WalletConnect to scan',
              },
            ],
          },
        },
      };
    },
  };
};
