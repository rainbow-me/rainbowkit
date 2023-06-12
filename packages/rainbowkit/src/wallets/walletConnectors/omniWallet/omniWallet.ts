/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface OmniWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface OmniWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const omniWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: OmniWalletLegacyOptions | OmniWalletOptions): Wallet => ({
  id: 'omni',
  name: 'Omni',
  iconUrl: async () => (await import('./omniWallet.svg')).default,
  iconBackground: '#000',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=fi.steakwallet.app',
    ios: 'https://itunes.apple.com/us/app/id1569375204',
    mobile: 'https://omniwallet.app.link',
    qrCode: 'https://omniwallet.app.link',
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
          return isAndroid() ? uri : `omni://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () =>
          getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: 'https://omni.app/support',
          steps: [
            {
              description:
                'Add Omni to your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Omni app',
            },
            {
              description: 'Create a new wallet or import an existing one.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.',
              step: 'scan',
              title: 'Tap the QR icon and scan',
            },
          ],
        },
      },
    };
  },
});
