import { createConnector } from 'wagmi';
import type { CreateConnectorFn } from 'wagmi';
import { type WalletConnectParameters, walletConnect } from 'wagmi/connectors';
import type { CreateConnector, WalletDetailsParams } from './Wallet';

interface CreateWalletConnectConnectorParams {
  projectId: string;
  walletDetails: WalletDetailsParams;
}

interface GetOrCreateWalletConnectInstanceParams {
  projectId: string;
}

const walletConnectInstances = new Map<
  string,
  ReturnType<typeof walletConnect>
>();

// Function to get or create a walletConnect instance
const getOrCreateWalletConnectInstance = ({
  projectId,
}: GetOrCreateWalletConnectInstanceParams): ReturnType<
  typeof walletConnect
> => {
  const config: WalletConnectParameters = {
    projectId,
    showQrModal: false, // Required. Otherwise WalletConnect modal (Web3Modal) will popup during time of connection for a wallet
  };

  const serializedConfig = JSON.stringify(config);

  const sharedWalletConnector = walletConnectInstances.get(serializedConfig);

  if (sharedWalletConnector) {
    return sharedWalletConnector;
  }

  // Create a new walletConnect instance and store it
  const newWalletConnectInstance = walletConnect(config);

  walletConnectInstances.set(serializedConfig, newWalletConnectInstance);

  return newWalletConnectInstance;
};

// Creates a WalletConnect connector with the given project ID and additional options.
function createWalletConnectConnector({
  projectId,
  walletDetails,
}: CreateWalletConnectConnectorParams): CreateConnectorFn {
  // Create and configure the WalletConnect connector with project ID and options.
  return createConnector((config) => ({
    ...getOrCreateWalletConnectInstance({
      projectId,
    })(config),
    ...walletDetails,
  }));
}

// Factory function to obtain a configured WalletConnect connector.
export function getWalletConnectConnector(): CreateConnector {
  let projectId = ''; // TODO: get projectId from config

  // We use this projectId in place of YOUR_PROJECT_ID for our examples.
  // This allows us our examples and templates to be functional with WalletConnect v2.
  // We warn developers against using this projectId in their dApp in production.
  const exampleProjectId = '21fef48091f12692cad574a6f7753643';

  if (!projectId || projectId === '') {
    throw new Error(
      'No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure',
    );
  }

  if (projectId === 'YOUR_PROJECT_ID') {
    projectId = exampleProjectId;
  }

  // Return a function that merges additional wallet details with `CreateConnectorFn`.
  return (walletDetails: WalletDetailsParams) =>
    createWalletConnectConnector({
      projectId,
      walletDetails,
    });
}
