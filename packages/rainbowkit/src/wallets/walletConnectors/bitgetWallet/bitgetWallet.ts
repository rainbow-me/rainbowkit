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

export interface BitgetWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const bitgetWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: BitgetWalletOptions): Wallet => {
  const isBitKeepInjected = hasInjectedProvider({
    namespace: 'bitkeep.ethereum',
    flag: 'isBitKeep',
  });
  const shouldUseWalletConnect = !isBitKeepInjected;

  return {
    id: 'bitget',
    name: 'Bitget Wallet',
    iconUrl: async () => (await import('./bitgetWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    downloadUrls: {
      android: 'https://web3.bitget.com/en/wallet-download?type=0',
      ios: 'https://apps.apple.com/app/bitkeep/id1395301115',
      mobile: 'https://web3.bitget.com/en/wallet-download?type=2',
      qrCode: 'https://web3.bitget.com/en/wallet-download',
      chrome:
        'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak',
      browserExtension: 'https://web3.bitget.com/en/wallet-download',
    },

    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            options: walletConnectOptions,
            projectId,
          })
        : getInjectedConnector({
            chains,
            namespace: 'bitkeep.ethereum',
            flag: 'isBitKeep',
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector);

        return isAndroid()
          ? uri
          : `bitkeep://wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://web3.bitget.com/en/academy',
            steps: [
              {
                description:
                  'wallet_connectors.bitget.extension.step1.description',
                step: 'install',
                title: 'wallet_connectors.bitget.extension.step1.title',
              },
              {
                description:
                  'wallet_connectors.bitget.extension.step2.description',
                step: 'create',
                title: 'wallet_connectors.bitget.extension.step2.title',
              },
              {
                description:
                  'wallet_connectors.bitget.extension.step3.description',
                step: 'refresh',
                title: 'wallet_connectors.bitget.extension.step3.description',
              },
            ],
          },
        },
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () => getWalletConnectUri(connector),
              instructions: {
                learnMoreUrl: 'https://web3.bitget.com/en/academy',
                steps: [
                  {
                    description:
                      'wallet_connectors.bitget.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.bitget.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.bitget.qr_code.step2.description',

                    step: 'create',
                    title: 'wallet_connectors.bitget.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.bitget.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.bitget.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};
