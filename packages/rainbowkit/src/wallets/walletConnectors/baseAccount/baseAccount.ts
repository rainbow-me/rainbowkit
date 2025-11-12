import { type CreateConnectorFn, createConnector } from 'wagmi';
import {
  type BaseAccountParameters,
  baseAccount as baseAccountConnector,
} from 'wagmi/connectors';
import type { Wallet, WalletDetailsParams } from '../../Wallet';

export interface BaseAccountOptions {
  appName: string;
  appIcon?: string;
}

// supports preference, paymasterUrls, subAccounts
type AcceptedBaseAccountParameters = Omit<
  BaseAccountParameters,
  'appName' | 'appLogoUrl'
>;

interface BaseAccount extends AcceptedBaseAccountParameters {
  (params: BaseAccountOptions): Wallet;
}

export const baseAccount: BaseAccount = ({
  appName,
  appIcon,
}: BaseAccountOptions): Wallet => {
  // Extract all AcceptedBaseAccountParameters from baseAccount
  // This approach avoids type errors for properties not yet in upstream connector
  const { preference, ...optionalConfig } = baseAccount;

  return {
    id: 'baseAccount',
    name: 'Base Account',
    shortName: 'Base Account',
    rdns: 'app.base.account',
    iconUrl: async () => (await import('./baseAccount.svg')).default,
    iconAccent: '#0000FF',
    iconBackground: '#0000FF',
    // a popup will appear prompting the user to connect or create a wallet via passkey.
    installed: true,
    createConnector: (walletDetails: WalletDetailsParams) => {
      const connector: CreateConnectorFn = baseAccountConnector({
        appName,
        appLogoUrl: appIcon,
        ...optionalConfig,
        preference: {
          telemetry: false,
          ...(preference || {}),
        },
      });

      return createConnector((config) => ({
        ...connector(config),
        ...walletDetails,
      }));
    },
  };
};
