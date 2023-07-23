/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { MetaMaskConnectorOptions } from '@wagmi/core/connectors/metaMask';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface FordefiWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface FordefiWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const fordefiWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
  ...options
}: (FordefiWalletLegacyOptions | FordefiWalletOptions) &
  MetaMaskConnectorOptions): Wallet => {
  const isFordefiInjected =
    typeof window !== 'undefined' &&
    ((typeof window.ethereum !== 'undefined' && window.ethereum.isFordefi) ||
      // @ts-expect-error
      !!window.isFordefi);

  const shouldUseWalletConnect = !isFordefiInjected;

  return {
    id: 'fordefi',
    name: 'Fordefi',
    iconUrl: async () => (await import('./fordefiWallet.svg')).default,
    iconAccent: '#486dff',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isFordefiInjected : undefined,
    downloadUrls: {},
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            version: walletConnectVersion,
            options: walletConnectOptions,
          })
        : new MetaMaskConnector({
            chains,
            options: {
              getProvider: () =>
                typeof window !== 'undefined'
                  ? // @ts-expect-error
                    window.isFordefi || window.ethereum
                  : undefined,
              ...options,
            },
          });

      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://docs.fordefi.com/',
            steps: [
              {
                description:
                  'We recommend pinning Fordefi to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the Fordefi extension',
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
