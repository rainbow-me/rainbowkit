/* eslint-disable sort-keys-fix/sort-keys-fix */
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';

export interface ArgentOptions {
  chains: Chain[];
  infuraId?: string;
}

export const argent = ({ chains, infuraId }: ArgentOptions): Wallet => ({
  id: 'argent',
  name: 'Argent',
  iconUrl: async () => (await import('./argent.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=im.argent.contractwalletclient',
    ios: 'https://apps.apple.com/us/app/argent/id1358741926',
    qrCode: 'https://argent.link/app',
  },
  createConnector: () => {
    const connector = new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: false,
      },
    });

    return {
      connector,
      mobile: {
        getUri: () => {
          const { uri } = connector.getProvider().connector;

          return isAndroid()
            ? uri
            : `https://argent.link/app/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: () => connector.getProvider().connector.uri,
        instructions: {
          learnMoreUrl: 'https://www.argent.xyz/learn/what-is-a-crypto-wallet/',
          steps: [
            {
              description:
                'Put Argent on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Argent app',
            },
            {
              description:
                'Create a wallet and username, or import an existing wallet.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'After you scan, a connection prompt will appear for you to connect your wallet.',
              step: 'scan',
              title: 'Tap the Scan QR button',
            },
          ],
        },
      },
    };
  },
});
