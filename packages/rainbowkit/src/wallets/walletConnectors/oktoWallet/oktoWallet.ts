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

export interface OktoWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface OktoWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const oktoWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: OktoWalletLegacyOptions | OktoWalletOptions): Wallet => ({
  id: 'Okto',
  name: 'Okto',
  iconUrl: async () => (await import('./oktoWallet.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=im.okto.contractwalletclient',
    ios: 'https://apps.apple.com/in/app/okto-wallet/id6450688229',
    mobile: 'https://okto.tech/',
    qrCode: 'https://okto.tech/',
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
          return isAndroid() ? uri : `okto://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () =>
          getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: 'https://okto.tech/',
          steps: [
            {
              description: 'wallet_connectors.okto.qr_code.step1.description',
              step: 'install',
              title: 'wallet_connectors.okto.qr_code.step1.title',
            },
            {
              description: 'wallet_connectors.okto.qr_code.step2.description',
              step: 'create',
              title: 'wallet_connectors.okto.qr_code.step2.title',
            },
            {
              description: 'wallet_connectors.okto.qr_code.step3.description',
              step: 'scan',
              title: 'wallet_connectors.okto.qr_code.step3.title',
            },
          ],
        },
      },
    };
  },
});
