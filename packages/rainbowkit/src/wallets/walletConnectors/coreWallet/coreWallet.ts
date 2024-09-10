import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type CoreWalletOptions = DefaultWalletOptions;

export const coreWallet = ({
  projectId,
  walletConnectParameters,
}: CoreWalletOptions): Wallet => {
  const isCoreInjected = hasInjectedProvider({
    namespace: 'avalanche',
    flag: 'isAvalanche',
  });
  const shouldUseWalletConnect = !isCoreInjected;
  return {
    id: 'core',
    name: 'Core',
    rdns: 'app.core.extension',
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
    mobile: {
      getUri: shouldUseWalletConnect ? (uri: string) => uri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl:
              'https://support.avax.network/en/articles/6115608-core-mobile-how-to-add-the-core-mobile-to-my-phone',
            steps: [
              {
                description: 'wallet_connectors.core.qr_code.step1.description',
                step: 'install',
                title: 'wallet_connectors.core.qr_code.step1.title',
              },
              {
                description: 'wallet_connectors.core.qr_code.step2.description',
                step: 'create',
                title: 'wallet_connectors.core.qr_code.step2.title',
              },
              {
                description: 'wallet_connectors.core.qr_code.step3.description',
                step: 'scan',
                title: 'wallet_connectors.core.qr_code.step3.title',
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
            description: 'wallet_connectors.core.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.core.extension.step1.title',
          },
          {
            description: 'wallet_connectors.core.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.core.extension.step2.title',
          },
          {
            description: 'wallet_connectors.core.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.core.extension.step3.title',
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
          namespace: 'avalanche',
          flag: 'isAvalanche',
        }),
  };
};
