/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { MetaMaskConnectorOptions } from '@wagmi/core/dist/connectors/metaMask';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface MetaMaskWalletOptions {
  chains: Chain[];
}

function isMetaMask(ethereum?: typeof window['ethereum']): boolean {
  // Logic borrowed from wagmi's MetaMaskConnector
  // https://github.com/wagmi-dev/references/blob/main/packages/connectors/src/metaMask.ts
  const isMetaMask = !!ethereum?.isMetaMask;
  if (!isMetaMask) return false;
  // Brave tries to make itself look like MetaMask
  // Could also try RPC `web3_clientVersion` if following is unreliable
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
    return false;
  if (ethereum.isApexWallet) return false;
  if (ethereum.isAvalanche) return false;
  if (ethereum.isKuCoinWallet) return false;
  if (ethereum.isPortal) return false;
  if (ethereum.isTokenPocket) return false;
  if (ethereum.isTokenary) return false;
  return true;
}

export const metaMaskWallet = ({
  chains,
  ...options
}: MetaMaskWalletOptions & MetaMaskConnectorOptions): Wallet => {
  const isMetaMaskInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    isMetaMask(window.ethereum);

  const shouldUseWalletConnect = !isMetaMaskInjected;

  return {
    id: 'metaMask',
    name: 'MetaMask',
    iconUrl: async () => (await import('./metaMaskWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : undefined,
    downloadUrls: {
      browserExtension:
        'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
      android: 'https://play.google.com/store/apps/details?id=io.metamask',
      ios: 'https://apps.apple.com/us/app/metamask/id1438144202',
      qrCode: 'https://metamask.io/download/',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ chains })
        : new MetaMaskConnector({
            chains,
            options,
          });

      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;

        return isAndroid()
          ? uri
          : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl: 'https://metamask.io/faqs/',
                steps: [
                  {
                    description:
                      'We recommend putting MetaMask on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the MetaMask app',
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
          learnMoreUrl: 'https://metamask.io/faqs/',
          instructions: {
            steps: [
              {
                description:
                  'We recommend pinning MetaMask to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the MetaMask extension',
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
