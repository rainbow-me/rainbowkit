import { CreateConnectorFn, Connector } from "wagmi";

export type InstructionStepName =
  | "install"
  | "create"
  | "scan"
  | "connect"
  | "refresh";

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
  createConnector: (options?: Record<string, any>) => CreateConnectorFn;
} & RainbowKitConnector;

export type WalletList = { groupName: string; wallets: Wallet[] }[];

export type WalletOptionsParams = Record<string, any>;
export type CreateConnector = (
  walletOptions?: Record<string, any>
) => CreateConnectorFn;

export type WalletInstance = Connector &
  Omit<Wallet, "createConnector" | "hidden"> & {
    index: number;
    groupIndex: number;
    groupName: string;
    isRainbowKitConnector: boolean;
    isWalletConnectModalConnector?: boolean;
    walletConnectModalConnector?: Connector;
  };
