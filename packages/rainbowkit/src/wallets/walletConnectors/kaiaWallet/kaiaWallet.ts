import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type KaiaWalletOptions = DefaultWalletOptions;

export const kaiaWallet = ({
  projectId,
  walletConnectParameters,
}: KaiaWalletOptions): Wallet => {
  const isKaiaWalletInjected = hasInjectedProvider({
    namespace: 'klaytn',
  });

  const shouldUseWalletConnect = !isKaiaWalletInjected;

  const getUri = (uri: string) => {
    return `kaikas://walletconnect?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: 'kaia',
    name: 'Kaia Wallet',
    iconUrl: async () => (await import('./kaiaWallet.svg')).default,
    installed: isKaiaWalletInjected || undefined,
    iconBackground: '#fff',
    downloadUrls: {
      chrome:
        'https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi',
      browserExtension: 'https://app.kaiawallet.io',
      qrCode: 'https://app.kaiawallet.io',
      ios: 'https://apps.apple.com/us/app/kaia-wallet/id6502896387',
      android: 'https://play.google.com/store/apps/details?id=io.klutch.wallet',
      mobile: 'https://app.kaiawallet.io',
    },
    mobile: { getUri: shouldUseWalletConnect ? getUri : undefined },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl: 'https://kaiawallet.io',
            steps: [
              {
                description: 'wallet_connectors.kaia.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.kaia.qr_code.step1.title',
              },
              {
                description: 'wallet_connectors.kaia.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.kaia.qr_code.step2.title',
              },
              {
                description: 'wallet_connectors.kaia.qr_code.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.kaia.qr_code.step3.title',
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://kaiawallet.io',
        steps: [
          {
            description: 'wallet_connectors.kaia.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.kaia.extension.step1.title',
          },
          {
            description: 'wallet_connectors.kaia.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.kaia.extension.step2.title',
          },
          {
            description: 'wallet_connectors.kaia.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.kaia.extension.step3.title',
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
          namespace: 'klaytn',
        }),
  };
};
