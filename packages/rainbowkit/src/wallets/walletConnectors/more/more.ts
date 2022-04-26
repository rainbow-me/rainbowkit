import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { RainbowKitChain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
// import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';

export interface Options {
  wcUrl: string;
  chains?: RainbowKitChain[];
}

export const MoreWallets = ({ chains, wcUrl }: Options) => {
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
      getUri: () => {
        const { uri } = connector.getProvider().connector;
        return isAndroid() ? uri : `${wcUrl}/wc?uri=${encodeURIComponent(uri)}`;
      },
    },
  };
};
