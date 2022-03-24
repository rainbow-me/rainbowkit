import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { isIOS } from '../../utils/isMobile';
import { Wallet } from '../Wallet';

export interface WalletConnectOptions {
  chains: Chain[];
  infuraId?: string;
}

export const walletConnect =
  ({ chains, infuraId }: WalletConnectOptions): Wallet =>
  () => {
    const ios = isIOS();

    const connector = new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: ios,
      },
    });

    const getUri = () => connector.getProvider().connector.uri;

    return {
      connector,
      iconUrl:
        'https://cloudflare-ipfs.com/ipfs/QmbFLEB7Q9iCsSR2mvb48eyn1nvARKeLaPYFnzHVUeBDMV',
      id: 'walletConnect',
      name: 'WalletConnect',
      ...(ios
        ? {}
        : {
            mobile: { getUri },
            qrCode: { getUri },
          }),
    };
  };
