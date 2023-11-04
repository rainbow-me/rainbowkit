import { walletConnect } from "wagmi/connectors";
import { createConnector, CreateConnectorFn } from "wagmi";
import { CreateConnector, WalletOptionsParams } from "./Wallet";

// Creates a WalletConnect connector with the given project ID and additional options.
function createWalletConnectConnector(
  projectId: string,
  walletOptions: WalletOptionsParams = {}
): CreateConnectorFn {
  // Create and configure the WalletConnect connector with project ID and options.
  return createConnector((config) => ({
    ...walletConnect({ projectId, showQrModal: false })(config),
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
  if (!projectId || projectId.trim() === "") {
    throw new Error(
      "No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure"
    );
  }

  // Return a function that merges additional wallet options with the default options.
  return (walletOptions: WalletOptionsParams = {}) =>
    createWalletConnectConnector(projectId, { ...walletOptions });
}
