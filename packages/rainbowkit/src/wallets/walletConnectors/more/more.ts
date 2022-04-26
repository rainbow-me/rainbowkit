import { chain } from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { Chain } from '../../../components/RainbowKitProvider/RainbowKitChainContext';
import { isAndroid } from '../../../utils/isMobile';

export interface Options {
  wcUrl: string;
}

export const MoreWallets = ({ wcUrl }: Options) => {
  const connector = new WalletConnectConnector({
    chains: [{ ...chain.mainnet, name: 'Ethereum' }],
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
