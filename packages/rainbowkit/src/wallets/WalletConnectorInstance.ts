import { Connector } from 'wagmi';
import { WalletConnectorConfig } from './WalletConnectorConfig';

export type WalletConnectorInstance = WalletConnectorConfig & {
  groupName: string;
  walletConnectModalConnector?: Connector;
};
