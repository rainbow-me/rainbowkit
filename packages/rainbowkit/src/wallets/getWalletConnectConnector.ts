/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable no-redeclare */
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
// @ts-ignore
type WalletConnectConnectorOptions = WalletConnectConnectorConfig['options'];

type WalletConnectLegacyConnectorConfig = ConstructorParameters<
  typeof WalletConnectLegacyConnector
>[0];
type WalletConnectLegacyConnectorOptions =
  // @ts-ignore
  WalletConnectLegacyConnectorConfig['options'];

function createConnector(
  version: WalletConnectVersion,
  config: WalletConnectLegacyConnectorConfig | WalletConnectConnectorConfig
) {
  // ignoring `version` until v2 delayed uri fetch changes are merged
  const connector = new WalletConnectLegacyConnector(config);
  sharedConnectors.set(JSON.stringify(config), connector);
  return connector;
}

export function getWalletConnectConnector(config: {
  chains: Chain[];
  projectId?: string; // to prepare for migration to v2
  options?: WalletConnectLegacyConnectorOptions;
}): WalletConnectLegacyConnector;

export function getWalletConnectConnector(config: {
  version: '1';
  chains: Chain[];
  options?: WalletConnectLegacyConnectorOptions;
}): WalletConnectLegacyConnector;

export function getWalletConnectConnector(config: {
  version: '2';
  chains: Chain[];
  projectId: string;
  options?: WalletConnectConnectorOptions;
}): WalletConnectConnector;

export function getWalletConnectConnector({
  chains,
  options = {},
  projectId,
  version = '1',
}: {
  chains: Chain[];
  projectId?: string;
  version?: WalletConnectVersion;
  options?: WalletConnectLegacyConnectorOptions | WalletConnectConnectorOptions;
}): any {
  const config = {
    chains,
    options: {
      projectId,
      ...options,
    },
  };

  const serializedConfig = JSON.stringify(config);
  const sharedConnector = sharedConnectors.get(serializedConfig);

  return sharedConnector ?? createConnector(version, config);
}
