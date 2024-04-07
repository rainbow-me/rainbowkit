import { CreateConnectorFn, createConnector } from 'wagmi';

interface CreateWagmiConnectorParameters {
  connector: CreateConnectorFn;
  metaData?: { [key in string]: any };
}

export function createWagmiConnector({
  connector,
  metaData = {},
}: CreateWagmiConnectorParameters) {
  return createConnector((config) => ({
    ...connector(config),
    ...metaData,
  }));
}
