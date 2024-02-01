import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface KresusWalletOptions {
  projectId: string;
  chains: Chain[];
}

export const kresusWallet = ({
  chains,
  projectId,
}: KresusWalletOptions): Wallet => ({
  id: 'kresus-wallet',
  name: 'Kresus Wallet',
  iconUrl:
    'https://media.licdn.com/dms/image/C4D0BAQFvPaHJbKWuhg/company-logo_200_200/0/1669189963337?e=2147483647&v=beta&t=1hfdXtEztnGcow9Le8z6B2_XEXYqB0pJQXsvPbYNH-U',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.kresus.superapp',
    ios: 'https://apps.apple.com/us/app/kresus-crypto-nft-superapp/id6444355152',
    qrCode: 'https://kresusconnect.kresus.com/download',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ projectId, chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const provider = await connector.getProvider();
          const uri = await new Promise<string>((resolve) =>
            provider.once('display_uri', resolve),
          );
          return uri;
        },
      },
      qrCode: {
        getUri: async () => {
          const provider = await connector.getProvider();
          const uri = await new Promise<string>((resolve) =>
            provider.once('display_uri', resolve),
          );
          return uri;
        },
      },
    };
  },
});
