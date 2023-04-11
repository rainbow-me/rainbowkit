/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/dist/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface RainbowWalletOptions {
  chains: Chain[];
}

function isRainbow(ethereum: NonNullable<typeof window['ethereum']>) {
  // `isRainbow` needs to be added to the wagmi `Ethereum` object
  const isRainbow = Boolean(ethereum.isRainbow);

  if (!isRainbow) {
    return false;
  }

  return true;
}

export const rainbowWallet = ({
  chains,
  ...options
}: RainbowWalletOptions & InjectedConnectorOptions): Wallet => {
  const isRainbowInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    isRainbow(window.ethereum);

  const shouldUseWalletConnect = !isRainbowInjected;
  return {
    id: 'rainbow',
    name: 'Rainbow',
    iconUrl: async () => (await import('./rainbowWallet.svg')).default,
    iconBackground: '#0c2f78',
    installed: !shouldUseWalletConnect ? isRainbowInjected : undefined,
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=me.rainbow&referrer=utm_source%3Drainbowkit',
      ios: 'https://apps.apple.com/app/apple-store/id1457119021?pt=119997837&ct=rainbowkit&mt=8',
      qrCode:
        'https://rainbow.download?utm_source=rainbowkit&utm_medium=qrcode',
      browserExtension: 'https://rainbow.me/extension?utm_source=rainbowkit',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
            options,
          });

      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return isAndroid()
          ? uri
          : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : undefined },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl:
                  'https://learn.rainbow.me/connect-to-a-website-or-app?utm_source=rainbowkit&utm_medium=connector&utm_campaign=learnmore',
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
            }
          : undefined,
      };
    },
  };
};
