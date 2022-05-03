import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';

export interface MoreOptions {
  wcUrl: string;
  chains: Chain[];
  options: {
    rpc: {
      [chainId: number]: string;
    };
    qrCode: boolean;
  };
}

export const MoreWallets = ({ chains, options, wcUrl }: MoreOptions) => {
  const connector = new WalletConnectConnector({
    chains,
    options,
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
