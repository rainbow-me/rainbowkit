import { type CreateConnectorFn, createConnector } from 'wagmi';
import {
  type BaseAccountParameters,
  baseAccount as baseAccountConnector,
} from 'wagmi/connectors';
import type { Wallet, WalletDetailsParams } from '../../Wallet';

export interface BaseOptions {
  appName: string;
  appIcon?: string;
}

// supports preference, paymasterUrls, subAccounts
type AcceptedBaseParameters = Omit<
  BaseAccountParameters,
  'appName' | 'appLogoUrl'
>;

interface Base extends AcceptedBaseParameters {
  (params: BaseOptions): Wallet;
}

export const base: Base = ({ appName, appIcon }: BaseOptions): Wallet => {
  // Extract all AcceptedBaseParameters from base
  // This approach avoids type errors for properties not yet in upstream connector
  const { preference, ...optionalConfig } = base;

  return {
    id: 'base',
    aliases: ['baseAccount'],
    name: 'Base',
    shortName: 'Base',
    rdns: 'app.base.account',
    iconUrl: async () => (await import('./base.svg')).default,
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

/**
 * @deprecated Use `base` instead. This alias will be removed in a future version.
 */
export const baseAccount = base;
