import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isAndroid } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { WalletConnectConnectorOptions } from '../../getWalletConnectConnector';

export interface OKXWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const okxWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: OKXWalletOptions): Wallet => {
  const isOKXInjected = hasInjectedProvider({ namespace: 'okxwallet' });
  const shouldUseWalletConnect = !isOKXInjected;

  return {
    id: 'okx',
    name: 'OKX Wallet',
    iconUrl: async () => (await import('./okxWallet.svg')).default,
    iconAccent: '#000',
    iconBackground: '#000',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.okinc.okex.gp',
      ios: 'https://itunes.apple.com/app/id1327268470?mt=8',
      mobile: 'https://okx.com/download',
      qrCode: 'https://okx.com/download',
      chrome:
        'https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge',
      edge: 'https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha',
      firefox: 'https://addons.mozilla.org/firefox/addon/okexwallet/',
      browserExtension: 'https://okx.com/download',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            options: walletConnectOptions,
          })
        : getInjectedConnector({ chains, namespace: 'okxwallet' });

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect
            ? async () => {
                const uri = await getWalletConnectUri(connector);
                return isAndroid()
                  ? uri
                  : `okex://main/wc?uri=${encodeURIComponent(uri)}`;
              }
            : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () => getWalletConnectUri(connector),
              instructions: {
                learnMoreUrl: 'https://okx.com/web3/',
                steps: [
                  {
                    description:
                      'wallet_connectors.okx.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.okx.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.okx.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.okx.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.okx.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.okx.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl: 'https://okx.com/web3/',
            steps: [
              {
                description:
                  'wallet_connectors.okx.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.okx.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.okx.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.okx.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.okx.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.okx.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
