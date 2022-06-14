import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
import { rpcUrlsForChains } from './../utils/rpcUrlsForChains';

type SerializedOptions = string;
const sharedConnectors = new Map<SerializedOptions, WalletConnectConnector>();

type WalletConnectConnectorOptions = ConstructorParameters<
  typeof WalletConnectConnector
>[0];

function createConnector(options: WalletConnectConnectorOptions) {
  const connector = new WalletConnectConnector(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}

export function getWalletConnectConnector({
  chains,
  qrcode = false,
}: {
  chains: Chain[];
  qrcode?: boolean;
}) {
  const rpc = rpcUrlsForChains(chains);
  const options: WalletConnectConnectorOptions = {
    chains,
    options: {
      qrcode,
      rpc,
    },
  };

  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);

  return sharedConnector ?? createConnector(options);
}
