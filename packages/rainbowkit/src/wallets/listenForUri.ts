import type { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import type { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy';

export function listenForUri(
  connector: WalletConnectConnector | WalletConnectLegacyConnector
): () => Promise<string> {
  return async () => {
    const provider = await connector.getProvider();
    const displayUri = new Promise<string>(resolve =>
      provider.once('display_uri', resolve)
    );
    return await displayUri;
  };
}
