import type { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import type { WalletConnectConnectorOptions } from '../../getWalletConnectConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface FrontierWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const frontierWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: FrontierWalletOptions): Wallet => {
  const isFrontierInjected = hasInjectedProvider({
    namespace: 'frontier.ethereum',
    flag: 'isFrontier',
  });
  const shouldUseWalletConnect = !isFrontierInjected;
  return {
    id: 'frontier',
    name: 'Frontier Wallet',
    installed: isFrontierInjected,
    iconUrl: async () => (await import('./frontierWallet.svg')).default,
    iconBackground: '#CC703C',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.frontierwallet',
      ios: 'https://apps.apple.com/us/app/frontier-crypto-defi-wallet/id1482380988',
      qrCode: 'https://www.frontier.xyz/download',
      chrome:
        'https://chrome.google.com/webstore/detail/frontier-wallet/kppfdiipphfccemcignhifpjkapfbihd',
      browserExtension: 'https://www.frontier.xyz/download',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            projectId,
            options: walletConnectOptions,
          })
        : undefined;
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector);
        return isAndroid()
          ? `frontier://wc?uri=${encodeURIComponent(uri)}`
          : uri;
      };
      return {
        connector: getInjectedConnector({
          chains,
          namespace: 'frontier.ethereum',
          flag: 'isFrontier',
        }),
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl: 'https://help.frontier.xyz/en/',
                steps: [
                  {
                    description:
                      'wallet_connectors.im_token.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.im_token.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.im_token.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.im_token.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.im_token.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.im_token.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl:
              'https://help.frontier.xyz/en/articles/6967236-setting-up-frontier-on-your-device',
            steps: [
              {
                description:
                  'wallet_connectors.frontier.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.frontier.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.frontier.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.frontier.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.frontier.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.frontier.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
