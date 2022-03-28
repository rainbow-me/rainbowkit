import { Connector } from 'wagmi';
export type InstructionStepName = 'install' | 'create' | 'scan';

export type WalletConnectorConfig<C extends Connector = Connector> = {
  installed?: boolean;
  connector: C;
  id: string;
  name: string;
  iconUrl: string;
  downloadUrls?: {
    mobile?: string;
    browserExtension?: string;
  };
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
