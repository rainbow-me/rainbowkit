import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
type SerializedOptions = string;
const sharedConnectors = new Map<SerializedOptions, WalletConnectConnector>();

type WalletConnectConnectorOptions = ConstructorParameters<
  typeof WalletConnectConnector
>[0];

function createConnector(options: WalletConnectConnectorOptions) {
  const connector = new WalletConnectConnector(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}

export function getWalletConnectConnector({
  chains,
  projectId,
  qrcode = false,
  version = '1',
}: {
  chains: Chain[];
  qrcode?: boolean;
  version?: '1' | '2';
  projectId?: string;
}) {
  const options: WalletConnectConnectorOptions = {
    chains,
    options: {
      projectId:
        projectId ||
        (process.env.WALLETCONNECT_PROJECT_ID as string) ||
        (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string),
      qrcode,
      version,
    },
  };

  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);

  return sharedConnector ?? createConnector(options);
}
