/* eslint-disable sort-keys-fix/sort-keys-fix */
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { rpcUrlsForChains } from '../../../utils/rpcUrlsForChains';
import { Wallet } from '../../Wallet';

export interface SteakOptions {
  chains: Chain[];
}

export const steak = ({ chains }: SteakOptions): Wallet => ({
  id: 'steak',
  name: 'Steakwallet',
  iconUrl: async () => (await import('./steak.svg')).default,
  iconBackground: '#000',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=fi.steakwallet.app',
    ios: 'https://apps.apple.com/np/app/steakwallet/id1569375204',
    qrCode: 'https://steakwallet.fi/download',
  },
  createConnector: () => {
    const rpc = rpcUrlsForChains(chains);
    const connector = new WalletConnectConnector({
      chains,
      options: {
        qrcode: false,
        rpc,
      },
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid()
            ? uri
            : `https://links.steakwallet.fi/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl:
            'https://blog.steakwallet.fi/introducing-the-steakwallet-beta/',
          steps: [
            {
              description:
                'Add Steakwallet to your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Steakwallet app',
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
