import { InjectedConnector } from 'wagmi/connectors/injected';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import {
  WalletConnectConnectorOptions,
  getWalletConnectConnector,
} from '../../getWalletConnectConnector';

export interface CLVWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

declare global {
  interface Window {
    clover: any;
  }
}

export const clvWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: CLVWalletOptions): Wallet => {
  const provider = typeof window !== 'undefined' && window['clover'];
  const isCLVInjected = Boolean(provider);

  const shouldUseWalletConnect = !isCLVInjected;

  return {
    id: 'clv',
    name: 'CLV',
    iconUrl: async () => (await import('./clvWallet.svg')).default,
    iconBackground: '#fff',
    iconAccent: '#BDFDE2',
    installed: !shouldUseWalletConnect ? isCLVInjected : undefined,
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/clv-wallet/nhnkbkgjikgcigadomkphalanndcapjk',
      ios: 'https://apps.apple.com/app/clover-wallet/id1570072858',
      mobile: 'https://apps.apple.com/app/clover-wallet/id1570072858',
      qrCode: 'https://clv.org/',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            options: walletConnectOptions,
            projectId,
            version: walletConnectVersion,
          })
        : new InjectedConnector({
            chains,
            options: {
              getProvider: () => provider,
            },
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, '2');
        return uri;
      };

      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://clv.org/',
            steps: [
              {
                description:
                  'wallet_connectors.clv.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.clv.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.clv.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.clv.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.clv.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.clv.extension.step3.title',
              },
            ],
          },
        },
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl: 'https://clv.org/',
                steps: [
                  {
                    description:
                      'wallet_connectors.clv.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.clv.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.clv.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.clv.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.clv.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.clv.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};
