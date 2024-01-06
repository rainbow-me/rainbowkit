import { createConnector } from 'wagmi';
import type { CreateConnectorFn } from 'wagmi';
import { WalletConnectParameters, walletConnect } from 'wagmi/connectors';
import type {
  CreateConnector,
  RainbowKitDetails,
  WalletDetailsParams,
} from './Wallet';

interface GetWalletConnectConnectorParams {
  projectId: string;
  walletConnectParameters?: WalletConnectParameters;
}

interface CreateWalletConnectConnectorParams {
  projectId: string;
  walletDetails: WalletDetailsParams;
  walletConnectParameters?: WalletConnectParameters;
}

interface GetOrCreateWalletConnectInstanceParams {
  projectId: string;
  walletConnectParameters?: WalletConnectParameters;
  rkDetailsShowQrModal?: RainbowKitDetails['showQrModal'];
}

const walletConnectInstances = new Map<
  string,
  ReturnType<typeof walletConnect>
>();

// Function to get or create a walletConnect instance
const getOrCreateWalletConnectInstance = ({
  projectId,
  walletConnectParameters,
  rkDetailsShowQrModal,
}: GetOrCreateWalletConnectInstanceParams): ReturnType<
  typeof walletConnect
> => {
  let config: WalletConnectParameters = {
    ...(walletConnectParameters ? walletConnectParameters : {}),
    projectId,
    showQrModal: false, // Required. Otherwise WalletConnect modal (Web3Modal) will popup during time of connection for a wallet
  };

  // `rkDetailsShowQrModal` should always be `true`
  if (rkDetailsShowQrModal) {
    config = { ...config, showQrModal: true };
  }

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
  walletConnectParameters,
}: CreateWalletConnectConnectorParams): CreateConnectorFn {
  // Create and configure the WalletConnect connector with project ID and options.
  return createConnector((config) => ({
    ...getOrCreateWalletConnectInstance({
      projectId,
      walletConnectParameters,
      // Used in `connectorsForWallets` to add another
      // walletConnect wallet into rainbowkit with modal popup option
      rkDetailsShowQrModal: walletDetails.rkDetails.showQrModal,
    })(config),
    ...walletDetails,
  }));
}

// Factory function to obtain a configured WalletConnect connector.
export function getWalletConnectConnector({
  projectId,
  walletConnectParameters,
}: GetWalletConnectConnectorParams): CreateConnector {
  // Check if the projectId is provided; if not, throw an error.
  if (!projectId) {
    throw new Error(
      'No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure',
    );
  }

  // Return a function that merges additional wallet details with `CreateConnectorFn`.
  return (walletDetails: WalletDetailsParams) =>
    createWalletConnectConnector({
      projectId,
      walletDetails,
      walletConnectParameters,
    });
}
