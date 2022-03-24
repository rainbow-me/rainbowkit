import { WalletConnectorConfig } from './WalletConnectorConfig';

export type ConnectorArgs = {
  chainId?: number;
};

export type Wallet = (
  connectorArgs: ConnectorArgs
) => WalletConnectorConfig<any>;

export type Wallets = { groupName: string; wallets: Wallet[] }[];
