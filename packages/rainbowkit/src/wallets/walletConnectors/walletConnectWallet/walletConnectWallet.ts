/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';
import { getWalletConnectConnector } from '../../getWalletConnectConnector';
import { listenForUri } from '../../listenForUri';

export interface WalletConnectWalletOptions {
  chains: Chain[];
}

export const walletConnectWallet = ({
  chains,
}: WalletConnectWalletOptions): Wallet => ({
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: async () => (await import('./walletConnectWallet.svg')).default,
  iconBackground: '#3b99fc',
  createConnector: () => {
    const ios = isIOS();

    const connector = getWalletConnectConnector({
      chains,
      qrcode: ios,
      version: '2',
    });

    const getUri = listenForUri(connector);

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
