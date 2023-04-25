/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';

export interface WalletConnectWalletOptions {
  projectId?: string;
  chains: Chain[];
}

export const walletConnectWallet = ({
  chains,
  projectId,
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
      },
    });

    const getUri = async () => (await connector.getProvider()).connector.uri;

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
