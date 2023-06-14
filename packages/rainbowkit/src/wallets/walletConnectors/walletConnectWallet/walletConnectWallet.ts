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

export interface WalletConnectWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  version: '1';
  options?: WalletConnectLegacyConnectorOptions;
}

export interface WalletConnectWalletOptions {
  projectId: string;
  chains: Chain[];
  version?: '2';
  options?: WalletConnectConnectorOptions;
}

export const walletConnectWallet = ({
  chains,
  options,
  projectId,
  version = '2',
}: WalletConnectWalletLegacyOptions | WalletConnectWalletOptions): Wallet => ({
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: async () => (await import('./walletConnectWallet.svg')).default,
  iconBackground: '#3b99fc',
  createConnector: () => {
    const ios = isIOS();

    const connector =
      version === '1'
        ? getWalletConnectConnector({
            version: '1',
            chains,
            options: {
              qrcode: ios,
              ...options,
            },
          })
        : getWalletConnectConnector({
            version: '2',
            chains,
            projectId,
            options: {
              showQrModal: ios,
              ...options,
            },
          });

    const getUri = async () => getWalletConnectUri(connector, version);

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
