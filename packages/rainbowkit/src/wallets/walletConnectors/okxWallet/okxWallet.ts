/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface OKXWalletOptions {
  chains: Chain[];
}

function isOKX(ethereum: NonNullable<typeof window['ethereum']>) {
  // `isOkxWallet` or `isOKExWallet` needs to be added to the wagmi `Ethereum` object
  // @ts-expect-error
  const isOKX = Boolean(ethereum.isOkxWallet || ethereum.isOKExWallet);
  if (!isOKX) {
    return false;
  }

  return true;
}

export const okxWallet = ({ chains }: OKXWalletOptions): Wallet => {
  const isOKXInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    isOKX(window.ethereum);

  const shouldUseWalletConnect = !isOKXInjected;

  return {
    id: 'okx',
    name: 'OKX Wallet',
    iconUrl: async () => (await import('./okxWallet.svg')).default,
    iconAccent: '#000',
    iconBackground: '#000',
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
      android: 'https://static.byucvwj.cn/upgradeapp/okx-android.apk',
      ios: 'https://itunes.apple.com/app/id1327268470?mt=8',
      qrCode: 'https://www.okx.com/web3',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new InjectedConnector({
            chains,
          });

      const getUri = async () => (await connector.getProvider()).connector.uri;

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl: 'https://www.okx.com/web3/',
                steps: [
                  {
                    description:
                      'We recommend putting OKX Wallet on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the OKX Wallet app',
                  },
                  {
                    description:
                      'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
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
        extension: {
          learnMoreUrl: 'https://www.okx.com/web3/',
          instructions: {
            steps: [
              {
                description:
                  'We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the OKX Wallet extension',
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
      };
    },
  };
};
