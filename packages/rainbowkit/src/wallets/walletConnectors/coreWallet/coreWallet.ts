/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface CoreWalletOptions {
  projectId?: string;
  chains: Chain[];
}

export const coreWallet = ({
  chains,
  projectId,
  ...options
}: CoreWalletOptions & InjectedConnectorOptions): Wallet => {
  const isCoreInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    window.ethereum.isAvalanche === true;

  const shouldUseWalletConnect = !isCoreInjected;
  return {
    id: 'core',
    name: 'Core',
    iconUrl: async () => (await import('./coreWallet.svg')).default,
    iconBackground: '#1A1A1C',
    installed: !shouldUseWalletConnect ? isCoreInjected : undefined,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=com.avaxwallet',
      ios: 'https://apps.apple.com/us/app/core-wallet/id6443685999',
      mobile: 'https://core.app/?downloadCoreMobile=1',
      qrCode: 'https://core.app/?downloadCoreMobile=1',
      chrome:
        'https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb',
      browserExtension: 'https://extension.core.app/',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({ projectId, chains })
        : new InjectedConnector({
            chains,
            options,
          });
      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return uri;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : undefined },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl:
                  'https://support.avax.network/en/articles/6115608-core-mobile-how-to-add-the-core-mobile-to-my-phone',
                steps: [
                  {
                    description:
                      'We recommend putting Core on your home screen for faster access to your wallet.',
                    step: 'install',
                    title: 'Open the Core app',
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
                    title: 'Tap the WalletConnect button',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl: 'https://extension.core.app/',
            steps: [
              {
                description:
                  'We recommend pinning Core to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the Core extension',
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
