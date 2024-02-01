import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface MyWalletOptions {
  projectId: string;
  chains: Chain[];
}

export const kresusWallet = ({
  chains,
  projectId,
}: MyWalletOptions): Wallet => ({
  id: 'kresus-wallet',
  name: 'Kresus Wallet',
  iconUrl:
    'https://media.licdn.com/dms/image/C4D0BAQFvPaHJbKWuhg/company-logo_200_200/0/1669189963337?e=2147483647&v=beta&t=1hfdXtEztnGcow9Le8z6B2_XEXYqB0pJQXsvPbYNH-U',
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=my.wallet',
    ios: 'https://apps.apple.com/us/app/my-wallet',
    chrome: 'https://chrome.google.com/webstore/detail/my-wallet',
    qrCode: 'https://my-wallet/qr',
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
        instructions: {
          learnMoreUrl: 'https://my-wallet/learn-more',
          steps: [
            {
              description: '',
              step: 'install',
              title: 'Open the My Wallet app',
            },
            {
              description:
                'After you scan, a connection prompt will appear for you to connect your wallet.',
              step: 'scan',
              title: 'Tap the scan button',
            },
          ],
        },
      },
      extension: {
        instructions: {
          learnMoreUrl: 'https://kresus.com',
          steps: [
            {
              description:
                'We recommend pinning My Wallet to your taskbar for quicker access to your wallet.',
              step: 'install',
              title: 'Install the My Wallet extension',
            },
            {
              description:
                'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
              step: 'create',
              title: 'Create or Import a Wallet',
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
});
