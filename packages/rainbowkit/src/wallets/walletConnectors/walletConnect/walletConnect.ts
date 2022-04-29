/* eslint-disable sort-keys-fix/sort-keys-fix */
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { createRpcUrlMap } from '../../../utils/createRpcUrlMap';
import { isIOS } from '../../../utils/isMobile';
import { Wallet } from '../../Wallet';

export interface WalletConnectOptions {
  chains: Chain[];
}

export const walletConnect = ({ chains }: WalletConnectOptions): Wallet => ({
  id: 'walletConnect',
  name: 'WalletConnect',
  iconUrl: async () => (await import('./walletConnect.svg')).default,
  iconBackground: '#3b99fc',
  createConnector: () => {
    const ios = isIOS();

    const rpc = createRpcUrlMap(chains);

    const connector = new WalletConnectConnector({
      chains,
      options: {
        qrcode: ios,
        rpc,
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
