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

export interface Coin98WalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const coin98Wallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: Coin98WalletOptions): Wallet => {
  const isCoin98WalletInjected = hasInjectedProvider({
    namespace: 'coin98Wallet',
    flag: 'isCoin98',
  });
  const shouldUseWalletConnect = !isCoin98WalletInjected;
  return {
    id: 'coin98',
    name: 'Coin98 Wallet',
    iconUrl: async () => (await import('./coin98Wallet.svg')).default,
    installed: isCoin98WalletInjected,
    iconAccent: '#CDA349',
    iconBackground: '#fff',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=coin98.crypto.finance.media',
      ios: 'https://apps.apple.com/vn/app/coin98-super-app/id1561969966',
      mobile: 'https://coin98.com/wallet',
      qrCode: 'https://coin98.com/wallet',
      chrome:
        'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg',
      browserExtension: 'https://coin98.com/wallet',
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
            namespace: 'coin98Wallet',
            flag: 'isCoin98',
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
                learnMoreUrl: 'https://coin98.com/wallet',
                steps: [
                  {
                    description:
                      'wallet_connectors.coin98.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.coin98.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.coin98.qr_code.step2.description',
                    step: 'create',
                    title: 'wallet_connectors.coin98.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.coin98.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.coin98.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl: 'https://coin98.com/wallet',
            steps: [
              {
                description:
                  'wallet_connectors.coin98.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.coin98.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.coin98.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.coin98.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.coin98.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.coin98.extension.step3.title',
              },
            ],
          },
        },
      };
    },
  };
};
