import type { Connector } from 'wagmi/connectors';

export async function getWalletConnectUri(
  connector: Connector,
  version: '1' | '2'
): Promise<string> {
  const provider = await connector.getProvider();
  return version === '2'
    ? new Promise<string>(resolve => provider.once('display_uri', resolve))
    : provider.connector.uri;
}
