import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
type SerializedOptions = string;
const sharedConnectors = new Map<
  SerializedOptions,
  WalletConnectLegacyConnector
>();

type WalletConnectConnectorOptions = ConstructorParameters<
  typeof WalletConnectLegacyConnector
>[0];

function createConnector(options: WalletConnectConnectorOptions) {
  const connector = new WalletConnectLegacyConnector(options);
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
  const options: WalletConnectConnectorOptions = {
    chains,
    options: {
      qrcode,
    },
  };

  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);

  return sharedConnector ?? createConnector(options);
}
