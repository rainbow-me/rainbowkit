/* eslint-disable sort-keys-fix/sort-keys-fix */
import { chain } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet, WalletConfig } from '../../Wallet';
import { getJsonRpcUrl } from '../../getJsonRpcUrl';

export interface TrustOptions {
  apiConfig?: WalletConfig['apiConfig'];
  chains: WalletConfig['chains'];
}

export const trust = ({ apiConfig, chains }: TrustOptions): Wallet => ({
  id: 'trust',
  name: 'Trust Wallet',
  iconUrl: async () => (await import('./trust.svg')).default,
  iconBackground: '#fff',
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
    ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
    qrCode: 'https://link.trustwallet.com',
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
            : `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl:
            'https://trustwallet.com/blog/an-introduction-to-trustwallet',
          steps: [
            {
              description:
                'Put Trust Wallet on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the Trust Wallet app',
            },
            {
              description: 'Create a new wallet or import an existing one.',
              step: 'create',
              title: 'Create or Import a Wallet',
            },
            {
              description:
                'Choose New Connection, then scan the QR code and confirm the prompt to connect.',
              step: 'scan',
              title: 'Tap WalletConnect in Settings',
            },
          ],
        },
      },
    };
  },
});
