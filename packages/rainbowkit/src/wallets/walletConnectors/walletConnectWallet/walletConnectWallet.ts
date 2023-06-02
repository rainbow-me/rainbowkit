/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { getWalletConnectUri } from '../../../utils/getWalletConnectUri';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from '../../getWalletConnectConnector';

export interface WalletConnectWalletOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion?: '1' | '2';
  options?: WalletConnectLegacyConnectorOptions | WalletConnectConnectorOptions;
}

export const walletConnectWallet = ({
  chains,
  options,
  projectId,
  walletConnectVersion = '2',
}: WalletConnectWalletOptions): Wallet => ({
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: async () => (await import('./walletConnectWallet.svg')).default,
  iconBackground: '#3b99fc',
  createConnector: () => {
    const ios = isIOS();

    const connector = getWalletConnectConnector({
      version: '1',
      chains,
      options: {
        qrcode: ios,
        projectId,
        ...options,
      },
    });

    const getUri = async () =>
      getWalletConnectUri(connector, walletConnectVersion);

    return {
      connector,
      ...(ios
        ? {}
        : {
            mobile: { getUri },
            qrCode: { getUri },
          }),
    };
  },
});
