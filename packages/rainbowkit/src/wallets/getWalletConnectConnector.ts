import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';

type SerializedOptions = string;
const sharedConnectors = new Map<SerializedOptions, WalletConnectConnector>();

type WalletConnectConnectorConfig = ConstructorParameters<
  typeof WalletConnectConnector
>[0];
export type WalletConnectConnectorOptions =
  // @ts-ignore
  WalletConnectConnectorConfig['options'];

function createConnector(
  config: WalletConnectConnectorConfig,
): WalletConnectConnector {
  const connector = new WalletConnectConnector(config);
  sharedConnectors.set(JSON.stringify(config), connector);
  return connector;
}

export function getWalletConnectConnector(config: {
  projectId: string;
  chains: Chain[];
  options?: WalletConnectConnectorOptions;
}): WalletConnectConnector;

export function getWalletConnectConnector({
  chains,
  options = {},
  projectId,
}: {
  chains: Chain[];
  projectId?: string;
  options?: WalletConnectConnectorOptions;
}): WalletConnectConnector {
  // We use this projectId in place of YOUR_PROJECT_ID for our examples.
  // This allows us our examples and templates to be functional with WalletConnect v2.
  // We warn developers against using this projectId in their dApp in production.
  const exampleProjectId = '21fef48091f12692cad574a6f7753643';
  if (!projectId || projectId === '')
    throw new Error(
      'No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure',
    );
  if (projectId === 'YOUR_PROJECT_ID' || projectId === exampleProjectId)
    console.warn(
      'Invalid projectId. Please create a unique WalletConnect Cloud projectId for your dApp https://www.rainbowkit.com/docs/installation#configure',
    );

  const config = {
    chains,
    options: {
      projectId: projectId === 'YOUR_PROJECT_ID' ? exampleProjectId : projectId,
      showQrModal: false,
      ...options,
    },
  };

  const serializedConfig = JSON.stringify(config);
  const sharedConnector = sharedConnectors.get(serializedConfig);

  return sharedConnector ?? createConnector(config);
}
