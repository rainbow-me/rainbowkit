import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

type SerializedOptions = string;
const sharedConnectors = new Map<
  SerializedOptions,
  WalletConnectLegacyConnector | WalletConnectConnector
>();

type WalletConnectVersion = '1' | '2';

type WalletConnectConnectorConfig = ConstructorParameters<
  typeof WalletConnectConnector
>[0];
export type WalletConnectConnectorOptions =
  // @ts-ignore
  WalletConnectConnectorConfig['options'];

type WalletConnectLegacyConnectorConfig = ConstructorParameters<
  typeof WalletConnectLegacyConnector
>[0];
export type WalletConnectLegacyConnectorOptions =
  // @ts-ignore
  WalletConnectLegacyConnectorConfig['options'];

function createConnector(
  version: WalletConnectVersion,
  config: WalletConnectLegacyConnectorConfig | WalletConnectConnectorConfig
): WalletConnectLegacyConnector | WalletConnectConnector {
  const connector =
    version === '2'
      ? new WalletConnectConnector(config)
      : new WalletConnectLegacyConnector(config);
  sharedConnectors.set(JSON.stringify(config), connector);
  return connector;
}

export function getWalletConnectConnector({
  chains,
  options = {},
  projectId,
  version = '2',
}: {
  chains: Chain[];
  projectId?: string;
  version?: WalletConnectVersion;
  options?: WalletConnectLegacyConnectorOptions | WalletConnectConnectorOptions;
}): WalletConnectConnector | WalletConnectLegacyConnector {
  const config = {
    chains,
    options: {
      projectId,
      qrcode: false,
      showQrModal: false,
      ...options,
    },
  };

  const serializedConfig = JSON.stringify(config);
  const sharedConnector = sharedConnectors.get(serializedConfig);

  return sharedConnector ?? createConnector(version, config);
}
