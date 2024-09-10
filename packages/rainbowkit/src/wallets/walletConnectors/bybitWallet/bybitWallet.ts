import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type BifrostWalletOptions = DefaultWalletOptions;

export const bybitWallet = ({
  projectId,
  walletConnectParameters,
}: BifrostWalletOptions): Wallet => {
  const isBybitInjected = hasInjectedProvider({
    namespace: 'bybitWallet',
  });

  const shouldUseWalletConnect = !isBybitInjected;

  const getUri = (uri: string) => {
    return `bybitapp://open/route?targetUrl=by://web3/walletconnect/wc?uri=${encodeURIComponent(
      uri,
    )}`;
  };

  return {
    id: 'bybit',
    name: 'Bybit Wallet',
    rdns: 'com.bybit',
    iconUrl: async () => (await import('./bybitWallet.svg')).default,
    installed: !shouldUseWalletConnect ? isBybitInjected : undefined,
    iconBackground: '#000000',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/bybit-wallet/pdliaogehgdbhbnmkklieghmmjkpigpa',
      browserExtension: 'https://www.bybit.com/en/web3',
      android: 'https://play.google.com/store/apps/details?id=com.bybit.app',
      ios: 'https://apps.apple.com/us/app/bybit-buy-trade-crypto/id1488296980',
      mobile: 'https://www.bybit.com/en/web3',
      qrCode: 'https://www.bybit.com/en/web3',
    },
    mobile: {
      getUri: shouldUseWalletConnect ? getUri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://www.bybit.com/en/web3',
            steps: [
              {
                description:
                  'wallet_connectors.bybit.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.bybit.qr_code.step1.title',
              },
              {
                description:
                  'wallet_connectors.bybit.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.bybit.qr_code.step2.title',
              },
              {
                description:
                  'wallet_connectors.bybit.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.bybit.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://www.bybit.com/en/web3',
        steps: [
          {
            description: 'wallet_connectors.bybit.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.bybit.extension.step1.title',
          },
          {
            description: 'wallet_connectors.bybit.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.bybit.extension.step2.title',
          },
          {
            description: 'wallet_connectors.bybit.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.bybit.extension.step3.title',
          },
        ],
      },
    },
    createConnector: shouldUseWalletConnect
      ? getWalletConnectConnector({
          projectId,
          walletConnectParameters,
        })
      : getInjectedConnector({
          namespace: 'bybitWallet',
        }),
  };
};
