import type { CreateConnectorFn } from 'wagmi';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { uniqueBy } from '../utils/uniqueBy';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';
import { getWalletConnectConnector } from './getWalletConnectConnector';
import type { Wallet, WalletList, DefaultWalletOptions } from './Wallet';
import type { CoinbaseWalletOptions } from './walletConnectors/coinbaseWallet/coinbaseWallet';

export interface ConnectorsForWalletsParameters {
  projectId: string;
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export const connectorsForWallets = (
  wallets:
    | WalletList
    | ((
        createWalletParams: CoinbaseWalletOptions & DefaultWalletOptions,
      ) => Wallet)[],
  {
    projectId,
    appName,
    appDescription,
    appUrl,
    appIcon,
  }: ConnectorsForWalletsParameters,
): CreateConnectorFn[] => {
  const walletFactories = (
    Array.isArray(wallets)
      ? wallets
      : (wallets as WalletList).flatMap((group) => group.wallets)
  ) as ((
    createWalletParams: CoinbaseWalletOptions & DefaultWalletOptions,
  ) => Wallet)[];

  if (!walletFactories.length) {
    throw new Error('No wallets provided');
  }

  let index = -1;

  const connectors: CreateConnectorFn[] = [];
  const visibleWallets: Array<
    Wallet & { index: number; groupIndex: number; groupName: string }
  > = [];
  const potentiallyHiddenWallets: Array<
    Wallet & { index: number; groupIndex: number; groupName: string }
  > = [];

  const groupIndex = 0;
  const groupName = '';

  for (const createWallet of walletFactories) {
    index++;

    const wallet = createWallet({
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
    });

    // guard against non-hex values for `iconAccent`
    if (wallet?.iconAccent && !isHexString(wallet?.iconAccent)) {
      throw new Error(
        `Property \`iconAccent\` is not a hex value for wallet: ${wallet.name}`,
      );
    }

    const walletListItem = {
      ...wallet,
      groupIndex: groupIndex + 1,
      groupName,
      index,
    };

    if (typeof wallet.hidden === 'function') {
      potentiallyHiddenWallets.push(walletListItem);
    } else {
      visibleWallets.push(walletListItem);
    }
  }

  // Filtering out duplicated wallets in case there is any.
  // We process the known visible wallets first so that the potentially
  // hidden wallets have access to the complete list of resolved wallets
  const walletItems = uniqueBy(
    [...visibleWallets, ...potentiallyHiddenWallets],
    'id',
  );

  for (const {
    createConnector,
    groupIndex,
    groupName,
    hidden,
    ...walletMeta
  } of walletItems) {
    if (typeof hidden === 'function') {
      // Run the function to check if the wallet needs to be hidden
      const isHidden = hidden();

      // If wallet is hidden, bail out and proceed to the next list item
      if (isHidden) {
        continue;
      }
    }

    const walletMetaData = () => {
      return {
        rkDetails: omitUndefinedValues({
          ...walletMeta,
          groupIndex,
          groupName,
          isRainbowKitConnector: true,
        }),
      };
    };

    let connector: CreateConnectorFn;
    if (createConnector) {
      connector = createConnector(walletMetaData());
    } else {
      const useInjected = hasInjectedProvider({
        flag: walletMeta.flag,
        namespace: walletMeta.namespace,
      });

      const fallback = useInjected
        ? getInjectedConnector({
            flag: walletMeta.flag,
            namespace: walletMeta.namespace,
          })
        : getWalletConnectConnector({
            projectId,
            //walletConnectParameters,
          });

      connector = fallback(walletMetaData());
    }

    connectors.push(connector);
  }

  return connectors;
};
