import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
type SerializedOptions = string;
const sharedConnectors = new Map<
  SerializedOptions,
  WalletConnectConnector | WalletConnectLegacyConnector
>();

type WalletConnectConnectorOptions = ConstructorParameters<
  typeof WalletConnectConnector | typeof WalletConnectLegacyConnector
>[0];

function createConnector(options: WalletConnectConnectorOptions) {
  const connector = new WalletConnectLegacyConnector(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}

export function getWalletConnectConnector({
  chains,
  projectId,
  qrcode = false,
}: {
  chains: Chain[];
  projectId?: string;
  qrcode?: boolean;
}) {
  const options: WalletConnectConnectorOptions = {
    chains,
    options: {
      projectId,
      qrcode,
    },
  };

  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);

  return sharedConnector ?? createConnector(options);
}
