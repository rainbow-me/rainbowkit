/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';

export interface CoinbaseOptions {
  appName: string;
  chains: Chain[];
}

export const coinbase = ({ appName, chains }: CoinbaseOptions): Wallet => {
  return {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    shortName: 'Coinbase',
    iconUrl: async () => (await import('./coinbase.svg')).default,
    iconBackground: '#2c5ff6',
    downloadUrls: {
      browserExtension:
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
        },
      });

      const getUri = async () => (await connector.getProvider()).qrUrl;

      return {
        connector,
        ...(ios
          ? {}
          : {
              mobile: { getUri },
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
            }),
      };
    },
  };
};
