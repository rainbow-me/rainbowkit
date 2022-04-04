/* eslint-disable sort-keys-fix/sort-keys-fix */
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import iconDataUrl from './trust.svg';

export interface TrustOptions {
  chains: Chain[];
  infuraId?: string;
}

export const trust = ({ chains, infuraId }: TrustOptions): Wallet => ({
  id: 'trust',
  name: 'Trust Wallet',
  iconUrl: iconDataUrl,
  downloadUrls: {
    android:
      'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
    ios: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
    qrCode: 'https://link.trustwallet.com',
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
            : `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: () => connector.getProvider().connector.uri,
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
