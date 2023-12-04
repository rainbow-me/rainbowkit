import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
} from '../../getWalletConnectConnector';


export interface BloomWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const bloomWallet = ({
  chains,
  projectId,
  walletConnectOptions,
}: BloomWalletOptions): Wallet => ({
  id: 'bloomWallet',
  iconBackground: '#000',
  iconAccent: '#000',
  name: 'Bloom Wallet',
  iconUrl: async () => (await import('./bloomWallet.svg')).default,
  downloadUrls: {
    windows: 'https://bloomwallet.io/',
    macos: 'https://bloomwallet.io/',
    linux: 'https://bloomwallet.io/',
    desktop: 'https://bloomwallet.io/',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId,
      chains,
      version: "2",
      options: walletConnectOptions,
    });

    return {
      connector,
      desktop: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            "2",
          );
          return `bloom://dapps/connect?uri=${encodeURIComponent(uri)}`;
        },
      },
    };
  },
});
