/* eslint-disable sort-keys-fix/sort-keys-fix */
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid, isIOS } from '../../utils/isMobile';
import { Wallet } from '../Wallet';

export interface TrustOptions {
  chains: Chain[];
  infuraId?: string;
}

export const trust = ({ chains, infuraId }: TrustOptions): Wallet => ({
  id: 'trust',
  name: 'Trust Wallet',
  iconUrl:
    'https://pbs.twimg.com/profile_images/1431208649507155978/Ad2o_xnz_400x400.jpg', //TODO: switch to IPFS
  downloadUrls: {
    mobile: isAndroid()
      ? 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp'
      : isIOS()
      ? 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409'
      : 'https://trustwallet.com/download/',
    scan: 'https://trustwallet.com/download/',
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
              description: 'Create a New Connection by scanning the QR code.',
              step: 'scan',
              title: 'Tap WalletConnect in Settings',
            },
          ],
        },
      },
    };
  },
});
