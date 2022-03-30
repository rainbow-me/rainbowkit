import { Connector } from 'wagmi';

export type InstructionStepName = 'install' | 'create' | 'scan';

export type ConnectorArgs = {
  chainId?: number;
};

type RainbowKitConnector<C extends Connector = Connector> = {
  connector: C;
  mobile?: {
    getUri?: () => string;
  };
  qrCode?: {
    iconUrl?: string;
    getUri: () => string;
    instructions?: {
      learnMoreUrl: string;
      steps: {
        step: InstructionStepName;
        title: string;
        description: string;
      }[];
    };
  };
};

export type Wallet<C extends Connector = Connector> = {
  id: string;
  name: string;
  shortName?: string;
  iconUrl: string;
  installed?: boolean;
  downloadUrls?: {
    android?: string;
    ios?: string;
    browserExtension?: string;
    qrCode?: string;
  };
  createConnector: (connectorArgs: {
    chainId?: number;
  }) => RainbowKitConnector<C>;
};

export type WalletList = { groupName: string; wallets: Wallet[] }[];

export type WalletInstance = Omit<Wallet, 'createConnector'> &
  ReturnType<Wallet['createConnector']> & {
    groupName: string;
    walletConnectModalConnector?: Connector;
  };
