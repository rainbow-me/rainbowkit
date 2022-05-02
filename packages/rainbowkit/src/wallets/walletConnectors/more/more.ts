import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';

export interface MoreOptions {
  wcUrl: string;
  chains: Chain[];
}

export const MoreWallets = ({ chains, wcUrl }: MoreOptions) => {
  const connector = new WalletConnectConnector({
    chains,
    options: {
      infuraId: process.env.INFURA_ID,
      qrcode: false,
    },
  });
  return {
    connector,
    mobile: {
      getUri: async () => {
        const { uri } = (await connector.getProvider()).connector;
        return isAndroid() ? uri : `${wcUrl}/wc?uri=${encodeURIComponent(uri)}`;
      },
    },
  };
};
