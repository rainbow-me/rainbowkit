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
    version === '1'
      ? new WalletConnectLegacyConnector(config)
      : new WalletConnectConnector(config);
  sharedConnectors.set(JSON.stringify(config), connector);
  return connector;
}

export function getWalletConnectConnector(config: {
  version?: WalletConnectVersion;
  projectId?: string;
  chains: Chain[];
  options?: WalletConnectConnectorOptions;
}): WalletConnectConnector;

export function getWalletConnectConnector(config: {
  version: '1';
  chains: Chain[];
  options?: WalletConnectLegacyConnectorOptions;
}): WalletConnectLegacyConnector;

export function getWalletConnectConnector(config: {
  version: '2';
  projectId: string;
  chains: Chain[];
  options?: WalletConnectConnectorOptions;
}): WalletConnectConnector;

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
  if (version === '2' && !projectId)
    throw new Error(
      'No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation'
    );
  const config = {
    chains,
    options:
      version === '1'
        ? {
            qrcode: false,
            ...options,
          }
        : {
            projectId,
            showQrModal: false,
            ...options,
          },
  };

  const serializedConfig = JSON.stringify(config);
  const sharedConnector = sharedConnectors.get(serializedConfig);

  return sharedConnector ?? createConnector(version, config);
}
