import type { CreateConnectorFn } from 'wagmi';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { uniqueBy } from '../utils/uniqueBy';
import type { Wallet } from './Wallet';

type WalletItem = Wallet & {
  index: number;
  groupIndex: number;
  groupName: string;
};

export interface ConnectorsForWalletsParameters {
  projectId: string;
  appName: string;
  appDescription?: string;
  appUrl?: string;
  appIcon?: string;
}

export const connectorsForWallets = (
  wallets: Wallet[],
  _parameters?: ConnectorsForWalletsParameters,
): CreateConnectorFn[] => {
  if (!wallets.length) {
    throw new Error('No wallets provided');
  }

  let index = -1;

  const connectors: CreateConnectorFn[] = [];
  const visibleWallets: WalletItem[] = [];
  const potentiallyHiddenWallets: WalletItem[] = [];

  for (const wallet of wallets) {
    index++;

    // guard against non-hex values for `iconAccent`
    if (wallet?.iconAccent && !isHexString(wallet?.iconAccent)) {
      throw new Error(
        `Property \`iconAccent\` is not a hex value for wallet: ${wallet.name}`,
      );
    }

    const walletListItem = {
      ...wallet,
      groupIndex: 0,
      groupName: '',
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
  const walletListItems: WalletItem[] = uniqueBy(
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
