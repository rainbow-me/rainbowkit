import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from '../../getInjectedConnector';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type { WalletConnectConnectorOptions } from '../../getWalletConnectConnector';

export interface FoxWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const foxWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: FoxWalletOptions): Wallet => {
  const isFoxInjected = hasInjectedProvider({
    namespace: 'foxwallet.ethereum',
  });
  const shouldUseWalletConnect = !isFoxInjected;

  return {
    id: 'foxwallet',
    name: 'FoxWallet',
    iconUrl: async () => (await import('./foxWallet.svg')).default,
    iconBackground: '#fff',
    downloadUrls: {
      android:
        'https://play.google.com/store/apps/details?id=com.foxwallet.play',
      ios: 'https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231',
      qrCode: 'https://foxwallet.com/download',
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            projectId,
            chains,
            options: walletConnectOptions,
          })
        : getInjectedConnector({ chains, namespace: 'foxwallet.ethereum' });

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect
            ? async () => {
                const uri = await getWalletConnectUri(connector);
                return `foxwallet://wc?uri=${encodeURIComponent(uri)}`;
              }
            : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () => getWalletConnectUri(connector),
              instructions: {
                learnMoreUrl: 'https://foxwallet.com',
                steps: [
                  {
                    description:
                      'wallet_connectors.fox.qr_code.step1.description',
                    step: 'install',
                    title: 'wallet_connectors.fox.qr_code.step1.title',
                  },
                  {
                    description:
                      'wallet_connectors.fox.qr_code.step2.description',

                    step: 'create',
                    title: 'wallet_connectors.fox.qr_code.step2.title',
                  },
                  {
                    description:
                      'wallet_connectors.fox.qr_code.step3.description',
                    step: 'scan',
                    title: 'wallet_connectors.fox.qr_code.step3.title',
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};
