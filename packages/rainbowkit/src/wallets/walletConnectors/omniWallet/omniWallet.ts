import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { WalletConnectConnectorOptions } from '../../getWalletConnectConnector';

export interface OmniWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const omniWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: OmniWalletOptions): Wallet => ({
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
      options: walletConnectOptions,
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(connector);
          return isAndroid() ? uri : `omni://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector),
        instructions: {
          learnMoreUrl: 'https://omni.app/support',
          steps: [
            {
              description: 'wallet_connectors.omni.qr_code.step1.description',
              step: 'install',
              title: 'wallet_connectors.omni.qr_code.step1.title',
            },
            {
              description: 'wallet_connectors.omni.qr_code.step2.description',
              step: 'create',
              title: 'wallet_connectors.omni.qr_code.step2.title',
            },
            {
              description: 'wallet_connectors.omni.qr_code.step3.description',
              step: 'scan',
              title: 'wallet_connectors.omni.qr_code.step3.title',
            },
          ],
        },
      },
    };
  },
});
