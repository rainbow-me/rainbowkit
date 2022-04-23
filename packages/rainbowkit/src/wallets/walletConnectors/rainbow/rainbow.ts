/* eslint-disable sort-keys-fix/sort-keys-fix */
import { chain } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet, WalletConfig } from '../../Wallet';
import { getJsonRpcUrl } from '../../getJsonRpcUrl';

export interface RainbowOptions {
  apiConfig?: WalletConfig['apiConfig'];
  chains: WalletConfig['chains'];
}

export const rainbow = ({ apiConfig, chains }: RainbowOptions): Wallet => ({
  id: 'rainbow',
  name: 'Rainbow',
  iconUrl: async () => (await import('./rainbow.svg')).default,
  iconBackground: '#0c2f78',
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=me.rainbow',
    ios: 'https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021',
    qrCode: 'https://rainbow.download',
  },
  createConnector: ({ chainId = chain.mainnet.id }) => {
    const jsonRpcUrl = getJsonRpcUrl({
      apiConfig,
      chains,
    });
    const connector = new WalletConnectConnector({
      chains,
      options: {
        qrcode: false,
        ...(apiConfig?.infuraId
          ? { infuraId: apiConfig?.infuraId }
          : {
              rpc: {
                [chainId]:
                  typeof jsonRpcUrl === 'function'
                    ? jsonRpcUrl({ chainId })
                    : jsonRpcUrl,
              },
            }),
      },
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;

          return isAndroid()
            ? uri
            : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl:
            'https://learn.rainbow.me/connect-your-wallet-to-a-website-or-app',
          steps: [
            {
              description:
                'We recommend putting Rainbow on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Rainbow app',
            },
            {
              description:
                'You can easily backup your wallet using our backup feature on your phone.',
              step: 'create',
              title: 'Create or Import a Wallet',
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
    };
  },
});
