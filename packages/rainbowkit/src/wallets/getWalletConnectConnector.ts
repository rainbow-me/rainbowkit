import { createConnector } from 'wagmi';
import { CreateConnectorFn } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { CreateConnector, WalletOptionsParams } from './Wallet';

const walletConnectInstances = new Map<
  string,
  ReturnType<typeof walletConnect>
>();

// Function to get or create a walletConnect instance
const getOrCreateWalletConnectInstance = (
  projectId: string,
  showQrModal: boolean,
): ReturnType<typeof walletConnect> => {
  const key = `${projectId}_${showQrModal}`;

  const sharedWalletConnector = walletConnectInstances.get(key);

  if (sharedWalletConnector) {
    return sharedWalletConnector;
  }

  // Create a new walletConnect instance and store it
  const newWalletConnectInstance = walletConnect({
    projectId,
    showQrModal,
  });

  walletConnectInstances.set(key, newWalletConnectInstance);

  return newWalletConnectInstance;
};

// Creates a WalletConnect connector with the given project ID and additional options.
function createWalletConnectConnector(
  projectId: string,
  walletOptions: WalletOptionsParams,
): CreateConnectorFn {
  // Create and configure the WalletConnect connector with project ID and options.
  return createConnector((config) => ({
    ...getOrCreateWalletConnectInstance(
      projectId,
      walletOptions.rkDetails?.showQrModal ?? false,
    )(config),
    ...walletOptions,
  }));
}

// Factory function to obtain a configured WalletConnect connector.
export function getWalletConnectConnector({
  projectId,
}: {
  projectId?: string;
}): CreateConnector {
  // Check if the projectId is provided; if not, throw an error.
  if (!projectId) {
    throw new Error(
      'No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure',
    );
  }

  // Return a function that merges additional wallet options with the default options.
  return (walletOptions: WalletOptionsParams) =>
    createWalletConnectConnector(projectId, { ...walletOptions });
}
