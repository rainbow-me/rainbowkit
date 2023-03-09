/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';

export interface CoinbaseWalletOptions {
  appName: string;
  chains: Chain[];
}

export const coinbaseWallet = ({
  appName,
  chains,
  ...options
}: CoinbaseWalletOptions): Wallet => {
  const isCoinbaseWalletInjected =
    typeof window !== 'undefined' && window.ethereum?.isCoinbaseWallet === true;

  return {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    shortName: 'Coinbase',
    iconUrl: async () => (await import('./coinbaseWallet.svg')).default,
    iconAccent: '#2c5ff6',
    iconBackground: '#2c5ff6',
    // Note that we never resolve `installed` to `false` because the
    // Coinbase Wallet SDK falls back to other connection methods if
    // the injected connector isn't available
    installed: isCoinbaseWalletInjected || undefined,
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
      android: 'https://play.google.com/store/apps/details?id=org.toshi',
      ios: 'https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455',
      qrCode: 'https://coinbase-wallet.onelink.me/q5Sx/fdb9b250',
    },
    createConnector: () => {
      const ios = isIOS();

      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          ...options,
        },
      });

      const getUri = async () => (await connector.getProvider()).qrUrl;

      return {
        connector,
        ...(ios
          ? {}
          : {
              qrCode: {
                getUri,
                instructions: {
                  learnMoreUrl:
                    'https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet',
                  steps: [
                    {
                      description:
                        'We recommend putting Coinbase Wallet on your home screen for quicker access.',
                      step: 'install',
                      title: 'Open the Coinbase Wallet app',
                    },
                    {
                      description:
                        'You can easily backup your wallet using the cloud backup feature.',
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
              extension: {
                instructions: {
                  steps: [
                    {
                      description:
                        'We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.',
                      step: 'install',
                      title: 'Install the Coinbase Wallet extension',
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
            }),
      };
    },
  };
};
