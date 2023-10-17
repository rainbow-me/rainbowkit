import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface ArgentWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface ArgentWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const argentWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: ArgentWalletLegacyOptions | ArgentWalletOptions): Wallet => ({
  id: 'argent',
  name: 'Argent',
  iconUrl: async () => (await import('./argentWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=im.argent.contractwalletclient',
    ios: 'https://apps.apple.com/us/app/argent/id1358741926',
    mobile: 'https://argent.xyz/download-argent',
    qrCode: 'https://argent.link/app',
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
            walletConnectVersion,
          );
          return isAndroid()
            ? uri
            : `argent://app/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () =>
          getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: 'https://argent.xyz/learn/what-is-a-crypto-wallet/',
          steps: [
            {
              description: 'wallet_connectors.argent.qr_code.step1.description',
              step: 'install',
              title: 'wallet_connectors.argent.qr_code.step1.title',
            },
            {
              description: 'wallet_connectors.argent.qr_code.step2.description',
              step: 'create',
              title: 'wallet_connectors.argent.qr_code.step2.title',
            },
            {
              description: 'wallet_connectors.argent.qr_code.step3.description',
              step: 'scan',
              title: 'wallet_connectors.argent.qr_code.step3.title',
            },
          ],
        },
      },
    };
  },
});
