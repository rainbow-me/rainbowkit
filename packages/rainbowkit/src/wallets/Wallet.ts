import type { Connector, CreateConnectorFn } from 'wagmi';
import type { WalletConnectParameters } from 'wagmi/connectors';
import type { CoinbaseWalletOptions } from './walletConnectors/coinbaseWallet/coinbaseWallet';
import type { WalletConnectWalletOptions } from './walletConnectors/walletConnectWallet/walletConnectWallet';

export type InstructionStepName =
  | 'install'
  | 'create'
  | 'scan'
  | 'connect'
  | 'refresh';

type RainbowKitConnector = {
  mobile?: {
    getUri?: (uri: string) => string;
  };
  desktop?: {
    getUri?: (uri: string) => string;
    instructions?: {
      learnMoreUrl: string;
      steps: {
        step: InstructionStepName;
        title: string;
        description: string;
      }[];
    };
  };
  qrCode?: {
    getUri: (uri: string) => string;
    instructions?: {
      learnMoreUrl: string;
      steps: {
        step: InstructionStepName;
        title: string;
        description: string;
      }[];
    };
  };
  extension?: {
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

export type Wallet = {
  id: string;
  name: string;
  rdns?: string;
  shortName?: string;
  iconUrl: string | (() => Promise<string>);
  iconAccent?: string;
  iconBackground: string;
  installed?: boolean;
  downloadUrls?: {
    android?: string;
    ios?: string;
    mobile?: string;
    qrCode?: string;
    chrome?: string;
    edge?: string;
    firefox?: string;
    opera?: string;
    safari?: string;
    browserExtension?: string;
    macos?: string;
    windows?: string;
    linux?: string;
    desktop?: string;
  };
  hidden?: () => boolean;
  createConnector: (walletDetails: WalletDetailsParams) => CreateConnectorFn;
} & RainbowKitConnector;

export interface DefaultWalletOptions {
  projectId: string;
  walletConnectParameters?: RainbowKitWalletConnectParameters;
}

export type CreateWalletFn = (
  // These parameters will be used when creating a wallet. If injected
  // wallet doesn't have parameters it will just ignore these passed in parameters
  createWalletParams: CoinbaseWalletOptions &
    Omit<WalletConnectWalletOptions, 'projectId'> &
    DefaultWalletOptions,
) => Wallet;

export type WalletList = {
  groupName: string;
  wallets: CreateWalletFn[];
}[];

// We don't want users to pass in `showQrModal` or `projectId`.
// Those two values are handled by rainbowkit. The rest of WalletConnect
// parameters can be passed with no issue
export type RainbowKitWalletConnectParameters = Omit<
  WalletConnectParameters,
  'showQrModal' | 'projectId'
>;

export type RainbowKitDetails = Omit<Wallet, 'createConnector' | 'hidden'> & {
  index: number;
  groupIndex: number;
  groupName: string;
  isWalletConnectModalConnector?: boolean;
  isRainbowKitConnector: boolean;
  walletConnectModalConnector?: Connector;
  // Used specifically in `connectorsForWallets` logic
  // to make sure we can also get WalletConnect modal in rainbowkit
  showQrModal?: true;
};

export type WalletDetailsParams = { rkDetails: RainbowKitDetails };

export type CreateConnector = (walletDetails: {
  rkDetails: RainbowKitDetails;
}) => CreateConnectorFn;

// This is the default connector you get at first from wagmi
// "Connector" + rainbowkit details we inject into the connector
export type WagmiConnectorInstance = Connector & {
  // this is optional since we only get
  // rkDetails if we use rainbowkit connectors
  rkDetails?: RainbowKitDetails;
};

// This will be the wallet instance we will return
// in the rainbowkit connect modal
export type WalletInstance = Connector & RainbowKitDetails;
