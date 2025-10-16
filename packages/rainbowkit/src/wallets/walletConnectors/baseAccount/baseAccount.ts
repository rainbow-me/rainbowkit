import { type CreateConnectorFn, createConnector } from 'wagmi';
import {
  type BaseAccountParameters,
  baseAccount as baseAccountConnector,
} from 'wagmi/connectors';
import type { Wallet, WalletDetailsParams, WalletFactory } from '../../Wallet';

// supports preference, paymasterUrls, subAccounts
export interface BaseAccountOptions
  extends Omit<BaseAccountParameters, 'appName' | 'appLogoUrl'> {
  appName: string;
  appIcon?: string;
}

export const baseAccount: WalletFactory<BaseAccountOptions, 'baseAccount'> = ({
  appName,
  appIcon,
  preference,
  ...optionalConfig
}) => {
  return {
    id: 'baseAccount' as const,
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
  } satisfies Wallet;
};
