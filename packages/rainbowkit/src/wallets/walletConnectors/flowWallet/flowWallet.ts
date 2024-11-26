import type { DefaultWalletOptions, Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export type FlowWalletOptions = DefaultWalletOptions;

export const flowWallet = ({
  projectId,
  walletConnectParameters,
}: FlowWalletOptions): Wallet => {
  const isFlowWalletInjected = hasInjectedProvider({
    flag: "isFrw",
  });

  const shouldUseWalletConnect = !isFlowWalletInjected;
  return {
    id: 'flow-wallet',
    name: 'Flow Wallet',
    iconUrl: 'https://lilico.app/logo_mobile.png',
    iconBackground: '#41CC5D',
    installed: isFlowWalletInjected,
    downloadUrls: {
      android: 'https://play.google.com/store/apps/details?id=com.flowfoundation.wallet',
      ios: 'https://apps.apple.com/ca/app/flow-wallet-nfts-and-crypto/id6478996750',
      chrome: 'https://chromewebstore.google.com/detail/flow-wallet/hpclkefagolihohboafpheddmmgdffjm',
      qrCode: 'https://link.lilico.app',
    },
    mobile: {
      getUri: (uri: string) => uri,
    },
    qrCode: {
      getUri: (uri: string) => uri,
      instructions: {
        learnMoreUrl: 'https://wallet.flow.com',
        steps: [
          {
            description: 'wallet_connectors.flow.qrcode.step1.description',
            step: 'install',
            title: 'wallet_connectors.flow.qrcode.step1.title',
          },
          {
            description: 'wallet_connectors.flow.qrcode.step2.description',
            step: 'scan',
            title: 'wallet_connectors.flow.qrcode.step2.title',
          },
        ],
      },
    },
    extension: {
      instructions: {
        learnMoreUrl: 'https://wallet.flow.com',
        steps: [
          {
            description: 'wallet_connectors.flow.extension.step1.description',
            step: 'install',
            title: 'wallet_connectors.flow.extension.step1.title',
          },
          {
            description:
              'wallet_connectors.flow.extension.step2.description',
            step: 'create',
            title: 'wallet_connectors.flow.extension.step2.title',
          },
          {
            description:
              'wallet_connectors.flow.extension.step3.description',
            step: 'refresh',
            title: 'wallet_connectors.flow.extension.step3.title',
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
          flag: 'isFrw',
        }),
  };
};
