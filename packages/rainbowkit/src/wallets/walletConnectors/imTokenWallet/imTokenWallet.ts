/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface ImTokenWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface ImTokenWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const imTokenWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: ImTokenWalletLegacyOptions | ImTokenWalletOptions): Wallet => ({
  id: 'imToken',
  name: 'imToken',
  iconUrl: async () => (await import('./imTokenWallet.svg')).default,
  iconBackground: '#098de6',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=im.token.app',
    ios: 'https://itunes.apple.com/us/app/imtoken2/id1384798940',
    mobile: 'https://token.im/download',
    qrCode: 'https://token.im/download',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions,
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return `imtokenv2://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () =>
          getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl:
            typeof window !== 'undefined' &&
            window.navigator.language.includes('zh')
              ? 'https://support.token.im/hc/zh-cn/categories/360000925393'
              : 'https://support.token.im/hc/en-us/categories/360000925393',
          steps: [
            {
              description:
                'Put imToken app on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the imToken app',
            },
            {
              description: 'Create a new wallet or import an existing one.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Choose New Connection, then scan the QR code and confirm the prompt to connect.',
              step: 'scan',
              title: 'Tap Scanner Icon in top right corner',
            },
          ],
        },
      },
    };
  },
});
