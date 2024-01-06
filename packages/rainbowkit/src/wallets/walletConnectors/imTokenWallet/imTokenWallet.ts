import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { WalletConnectConnectorOptions } from '../../getWalletConnectConnector';

export interface ImTokenWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const imTokenWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: ImTokenWalletOptions): Wallet => ({
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
      options: walletConnectOptions,
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(connector);
          return `imtokenv2://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector),
        instructions: {
          learnMoreUrl:
            typeof window !== 'undefined' &&
            window.navigator.language.includes('zh')
              ? 'https://support.token.im/hc/zh-cn/categories/360000925393'
              : 'https://support.token.im/hc/en-us/categories/360000925393',
          steps: [
            {
              description:
                'wallet_connectors.im_token.qr_code.step1.description',
              step: 'install',
              title: 'wallet_connectors.im_token.qr_code.step1.title',
            },
            {
              description:
                'wallet_connectors.im_token.qr_code.step2.description',
              step: 'create',
              title: 'wallet_connectors.im_token.qr_code.step2.title',
            },
            {
              description:
                'wallet_connectors.im_token.qr_code.step3.description',
              step: 'scan',
              title: 'wallet_connectors.im_token.qr_code.step3.title',
            },
          ],
        },
      },
    };
  },
});
