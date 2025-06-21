import type { CreateConnectorFn } from 'wagmi';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { uniqueBy } from '../utils/uniqueBy';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';
import { getWalletConnectConnector } from './getWalletConnectConnector';
import type { Wallet, WalletList } from './Wallet';

export interface ConnectorsForWalletsParameters {
  projectId: string;
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export const connectorsForWallets = (
  walletsInput: (Wallet | ((...args: any[]) => Wallet))[] | WalletList,
  {
    projectId,
    appName,
    appDescription,
    appUrl,
    appIcon,
  }: ConnectorsForWalletsParameters,
): CreateConnectorFn[] => {
  if (!walletsInput.length) {
    throw new Error('No wallet list was provided');
  }

  const wallets = Array.isArray((walletsInput as any)[0]?.wallets)
    ? (walletsInput as WalletList).flatMap((g) => g.wallets)
    : (walletsInput as (Wallet | (() => Wallet))[]);

  let index = -1;
  const connectors: CreateConnectorFn[] = [];
  const visible: (Wallet & { index: number; groupIndex: number })[] = [];
  const potential: (Wallet & { index: number; groupIndex: number })[] = [];

  for (const [groupIndex, walletOrFn] of wallets.entries()) {
    index++;

    const wallet =
      typeof walletOrFn === 'function'
        ? walletOrFn({
            projectId,
            appName,
            appIcon,
            walletConnectParameters: {
              metadata: {
                name: appName,
                description: appDescription ?? appName,
                url:
                  appUrl ??
                  (typeof window !== 'undefined' ? window.location.origin : ''),
                icons: [...(appIcon ? [appIcon] : [])],
              },
            },
          })
        : walletOrFn;

    if (wallet?.iconAccent && !isHexString(wallet.iconAccent)) {
      throw new Error(
        `Property \`iconAccent\` is not a hex value for wallet: ${wallet.name}`,
      );
    }

    const item = { ...wallet, groupIndex: groupIndex + 1, index };

    if (typeof wallet.hidden === 'function') {
      potential.push(item);
    } else {
      visible.push(item);
    }
  }

  const list = uniqueBy([...visible, ...potential], 'id');

  for (const { createConnector, groupIndex, hidden, ...meta } of list) {
    if (typeof hidden === 'function' && hidden()) continue;

    const metaData = () => ({
      rkDetails: omitUndefinedValues({
        ...meta,
        groupIndex,
        isRainbowKitConnector: true,
      }),
    });

    const connector = createConnector
      ? createConnector(metaData())
      : (hasInjectedProvider({ flag: meta.flag, namespace: meta.namespace })
          ? getInjectedConnector({ flag: meta.flag, namespace: meta.namespace })
          : getWalletConnectConnector({ projectId }))(metaData());

    connectors.push(connector);
  }

  return connectors;
};
