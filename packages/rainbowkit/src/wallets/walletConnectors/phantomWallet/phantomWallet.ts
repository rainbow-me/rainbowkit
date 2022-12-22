/* eslint-disable sort-keys-fix/sort-keys-fix */
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

export interface PhantomWalletOptions {
  chains: Chain[];
  shimDisconnect?: boolean;
}

export const phantomWallet = ({
  chains,
  shimDisconnect,
}: PhantomWalletOptions): Wallet => {
  const isPhantomInjected =
    typeof window !== 'undefined' &&
    typeof window.ethereum !== 'undefined' &&
    typeof (window.ethereum as any).isPhantom !== 'undefined';
  return {
    id: 'phantom',
    name: 'Phantom',
    iconUrl: async () => (await import('./phantomWallet.svg')).default,
    iconBackground: '#551BF9',
    installed: isPhantomInjected,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=app.phantom',
      ios: 'https://apps.apple.com/app/phantom-solana-wallet/1598432977',
      browserExtension: 'https://phantom.app/download',
    },
    createConnector: () => {
      const connector = new InjectedConnector({
        chains,
        options: { shimDisconnect },
      });

      return {
        connector,
        extension: {
          learnMoreUrl: 'https://help.phantom.app',
          instructions: {
            steps: [
              {
                description:
                  'We recommend pinning Phantom to your taskbar for easier access to your wallet.',
                step: 'install',
                title: 'Install the Phantom extension',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone.',
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
