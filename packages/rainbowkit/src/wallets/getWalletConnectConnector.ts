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
export type WalletConnectConnectorOptions =
  // @ts-ignore - 'options' does not exist on type 'unknown'
  WalletConnectConnectorConfig['options'];

type WalletConnectLegacyConnectorConfig = ConstructorParameters<
  typeof WalletConnectLegacyConnector
>[0];
export type WalletConnectLegacyConnectorOptions =
  // @ts-ignore - 'options' does not exist on type 'unknown'
  WalletConnectLegacyConnectorConfig['options'];

function createConnector(
  version: '1',
  config: WalletConnectLegacyConnectorConfig
): WalletConnectLegacyConnector;

function createConnector(
  version: '2',
  config: WalletConnectConnectorConfig
): WalletConnectConnector;

function createConnector(
  version: WalletConnectVersion,
  config: WalletConnectLegacyConnectorConfig | WalletConnectConnectorConfig
): WalletConnectLegacyConnector | WalletConnectConnector {
  // ignoring `version` until v2 delayed uri fetch changes are merged
  const connector = new WalletConnectLegacyConnector(
    config as WalletConnectLegacyConnectorConfig
  );
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
  options?: Omit<WalletConnectConnectorOptions, 'projectId'>;
}): WalletConnectLegacyConnector;

export function getWalletConnectConnector({
  chains,
  options = {},
}: {
  chains: Chain[];
  projectId?: string;
  version?: WalletConnectVersion;
  options?:
    | WalletConnectLegacyConnectorOptions
    | Omit<WalletConnectConnectorOptions, 'projectId'>;
}): WalletConnectLegacyConnector | WalletConnectConnector {
  const config = {
    chains,
    options: {
      qrcode: false,
      ...options,
    },
  };

  const serializedConfig = JSON.stringify(config);
  const sharedConnector = sharedConnectors.get(serializedConfig);

  return sharedConnector ?? createConnector('1', config);
}
