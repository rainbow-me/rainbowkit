/* eslint-disable sort-keys-fix/sort-keys-fix */
import { chain } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet, WalletConfig } from '../../Wallet';
import { getJsonRpcUrl } from '../../getJsonRpcUrl';

export interface ArgentOptions {
  apiConfig?: WalletConfig['apiConfig'];
  chains: WalletConfig['chains'];
}

export const argent = ({ apiConfig, chains }: ArgentOptions): Wallet => ({
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
  createConnector: ({ chainId = chain.mainnet.id }) => {
    const jsonRpcUrl = getJsonRpcUrl({
      apiConfig,
      chains,
    });
    const connector = new WalletConnectConnector({
      chains,
      options: {
        qrcode: false,
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
      },
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;

          return isAndroid()
            ? uri
            : `https://argent.link/app/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
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
