import type { InjectedConnectorOptions } from '@wagmi/core/connectors/injected';
import { InjectedConnector } from 'wagmi/connectors/injected';
import type { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isMobile } from '../../../utils/isMobile';
import type { Wallet } from '../../Wallet';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface TokenPocketWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface TokenPocketWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const tokenPocketWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: (TokenPocketWalletLegacyOptions | TokenPocketWalletOptions) &
  InjectedConnectorOptions): Wallet => {
  const isTokenPocketInjected =
    typeof window !== 'undefined' && window.ethereum?.isTokenPocket === true;

  const shouldUseWalletConnect = !isTokenPocketInjected;

  return {
    id: 'tokenPocket',
    name: 'TokenPocket',
    iconUrl: async () => (await import('./tokenPocketWallet.svg')).default,
    iconBackground: '#2980FE',
    installed: !shouldUseWalletConnect ? isTokenPocketInjected : undefined,
    downloadUrls: {
      chrome:
        'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii',
      browserExtension: 'https://extension.tokenpocket.pro/',
      android:
        'https://play.google.com/store/apps/details?id=vip.mytokenpocket',
      ios: 'https://apps.apple.com/us/app/tp-global-wallet/id6444625622',
      qrCode: 'https://tokenpocket.pro/en/download/app',
      mobile: 'https://tokenpocket.pro/en/download/app',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            projectId,
            options: walletConnectOptions,
            version: walletConnectVersion,
          })
        : new InjectedConnector({ chains });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isMobile()
          ? `tpoutside://wc?uri=${encodeURIComponent(uri)}`
          : uri;
      };

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri,
              instructions: {
                learnMoreUrl: 'https://help.tokenpocket.pro/en/',
                steps: [
                  {
                    description:
                      'wallet_connectors.token_pocket.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.token_pocket.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.token_pocket.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.token_pocket.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.token_pocket.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.token_pocket.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl:
              'https://help.tokenpocket.pro/en/extension-wallet/faq/installation-tutorial',
            steps: [
              {
                description:
                  'wallet_connectors.token_pocket.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.token_pocket.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.token_pocket.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.token_pocket.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.token_pocket.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.token_pocket.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
