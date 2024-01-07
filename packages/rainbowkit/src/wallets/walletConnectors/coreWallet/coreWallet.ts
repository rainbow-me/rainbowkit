import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import {
  WalletConnectConnectorOptions,
  getWalletConnectConnector,
} from '../../getWalletConnectConnector';

export interface CoreWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const coreWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: CoreWalletOptions): Wallet => {
  const isCoreInjected = hasInjectedProvider({
    namespace: 'avalanche',
    flag: 'isAvalanche',
  });
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
        ? getWalletConnectConnector({
            projectId,
            chains,
            options: walletConnectOptions,
          })
        : getInjectedConnector({
            chains,
            namespace: 'avalanche',
            flag: 'isAvalanche',
          });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector);
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
                      'wallet_connectors.core.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.core.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.core.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.core.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.core.qr_code.step3.description',
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
                description:
                  'wallet_connectors.core.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.core.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.core.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.core.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.core.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.core.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
