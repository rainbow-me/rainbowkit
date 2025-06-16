import type { CreateConnectorFn } from 'wagmi';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { uniqueBy } from '../utils/uniqueBy';
import type { Wallet, WalletList } from './Wallet';

interface WalletListItem extends Wallet {
  index: number;
  groupIndex: number;
  groupName: string;
}

export interface ConnectorsForWalletsParameters {
  projectId: string;
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export const connectorsForWallets = (
  walletList: WalletList,
  {
    projectId,
    appName,
    appDescription,
    appUrl,
    appIcon,
  }: ConnectorsForWalletsParameters,
): CreateConnectorFn[] => {
  if (!walletList.length) {
    throw new Error('No wallet list was provided');
  }

  for (const { wallets, groupName } of walletList) {
    if (!wallets.length) {
      throw new Error(`No wallets provided for group: ${groupName}`);
    }
  }

  let index = -1;

  const connectors: CreateConnectorFn[] = [];
  const visibleWallets: WalletListItem[] = [];
  const potentiallyHiddenWallets: WalletListItem[] = [];

  for (const [groupIndex, { groupName, wallets }] of walletList.entries()) {
    for (const createWallet of wallets) {
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
  }

  // Filtering out duplicated wallets in case there is any.
  // We process the known visible wallets first so that the potentially
  // hidden wallets have access to the complete list of resolved wallets
  const walletListItems: WalletListItem[] = uniqueBy(
    [...visibleWallets, ...potentiallyHiddenWallets],
    'id',
  );

  for (const {
    createConnector,
    groupIndex,
    groupName,
    hidden,
    ...walletMeta
  } of walletListItems) {
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

    const connector = createConnector(walletMetaData());

    connectors.push(connector);
  }

  return connectors;
};
