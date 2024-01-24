import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet } from '../../Wallet';

declare global {
  interface Window {
    ramper2: {
      provider: Window['ethereum'];
    };
  }
}

export interface RamperWalletOptions {
  chains: Chain[];
}

export const ramperWallet = ({
  chains,
  ...options
}: RamperWalletOptions & InjectedConnectorOptions): Wallet => {
  return {
    id: 'ramper',
    name: 'Ramper Wallet',
    iconUrl: async () => (await import('./ramperWallet.svg')).default,
    installed:
      (typeof window !== 'undefined' && !!(window as any)?.ramper2?.provider) ||
      undefined,
    iconAccent: '#CDA349',
    iconBackground: '#fff',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=ramper.wallet.crypto.finance',
      ios: 'https://apps.apple.com/vn/app/ramper-wallet/id6461721561',
      mobile: 'https://www.ramper.xyz/download',
      qrCode: 'https://www.ramper.xyz/download',
      chrome:
        'https://chromewebstore.google.com/detail/ramper-wallet/nbdhibgjnjpnkajaghbffjbkcgljfgdi',
      browserExtension: 'https://www.ramper.xyz/download',
    },

    createConnector: () => {
      const connector = new InjectedConnector({
        chains,
        options: {
          name: 'Ramper Wallet',
          getProvider: () => {
            if (typeof window === 'undefined') return;
            return window.ramper2?.provider;
          },
          ...options,
        },
      });

      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://www.ramper.xyz',
            steps: [
              {
                description:
                  'wallet_connectors.ramper.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.ramper.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.ramper.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.ramper.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.ramper.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.ramper.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
