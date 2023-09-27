import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { translateWithLocaleLocalStorage } from '../../../locales';
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
            walletConnectVersion,
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
              description: translateWithLocaleLocalStorage(
                'wallet_connectors.qr_code.omni.step1.description',
              ),
              step: 'install',
              title: translateWithLocaleLocalStorage(
                'wallet_connectors.qr_code.omni.step1.title',
              ),
            },
            {
              description: translateWithLocaleLocalStorage(
                'wallet_connectors.qr_code.omni.step2.description',
              ),
              step: 'create',
              title: translateWithLocaleLocalStorage(
                'wallet_connectors.qr_code.omni.step2.title',
              ),
            },
            {
              description: translateWithLocaleLocalStorage(
                'wallet_connectors.qr_code.omni.step3.description',
              ),
              step: 'scan',
              title: translateWithLocaleLocalStorage(
                'wallet_connectors.qr_code.omni.step3.title',
              ),
            },
          ],
        },
      },
    };
  },
});
