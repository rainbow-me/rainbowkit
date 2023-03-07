import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';
import { Chain } from '../components/RainbowKitProvider/RainbowKitChainContext';
type SerializedOptions = string;
const sharedConnectors = new Map<
  SerializedOptions,
  WalletConnectConnector | WalletConnectLegacyConnector
>();

type WalletConnectVersion = '1' | '2';
type WalletConnectConnectorOptions = ConstructorParameters<
  typeof WalletConnectConnector | typeof WalletConnectLegacyConnector
>[0];

function createConnector(
  version: WalletConnectVersion,
  options: WalletConnectConnectorOptions
) {
  const connector =
    version === '1'
      ? new WalletConnectLegacyConnector(options)
      : new WalletConnectConnector(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}

export function getWalletConnectConnector({
  chains,
  projectId,
  qrcode = false,
  version = '1', // This will default to '2' in a future release
}: {
  chains: Chain[];
  qrcode?: boolean;
  version?: WalletConnectVersion;
  projectId?: string;
}) {
  const options: WalletConnectConnectorOptions =
    version === '1'
      ? {
          chains,
          options: {
            qrcode,
          },
        }
      : {
          chains,
          options: {
            projectId:
              projectId ||
              (process.env.WALLETCONNECT_PROJECT_ID as string) ||
              (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string),
            showQrModal: qrcode,
          },
        };

  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);

  return sharedConnector ?? createConnector(version, options);
}
