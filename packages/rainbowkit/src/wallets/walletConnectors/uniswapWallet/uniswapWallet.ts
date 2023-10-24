import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface UniswapWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: '1';
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface UniswapWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: '2';
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const uniswapWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = '2',
}: UniswapWalletLegacyOptions | UniswapWalletOptions): Wallet => ({
  id: 'uniswap',
  name: 'Uniswap Wallet',
  iconUrl: async () => (await import('./uniswapWallet.svg')).default,
  iconBackground: '#FFD8EA',
  downloadUrls: {
    ios: 'https://apps.apple.com/app/apple-store/id6443944476',
    mobile: 'https://wallet.uniswap.org/',
    qrCode: 'https://wallet.uniswap.org/',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions,
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion,
          );
          return `uniswap://wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: async () =>
          getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: 'https://wallet.uniswap.org/',
          steps: [
            {
              description:
                'wallet_connectors.uniswap.qr_code.step1.description',
              step: 'install',
              title: 'wallet_connectors.uniswap.qr_code.step1.title',
            },
            {
              description:
                'wallet_connectors.uniswap.qr_code.step2.description',
              step: 'create',
              title: 'wallet_connectors.uniswap.qr_code.step2.title',
            },
            {
              description:
                'wallet_connectors.uniswap.qr_code.step3.description',
              step: 'scan',
              title: 'wallet_connectors.uniswap.qr_code.step3.title',
            },
          ],
        },
      },
    };
  },
});
