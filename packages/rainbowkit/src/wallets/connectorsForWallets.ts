import type { CreateConnectorFn } from 'wagmi';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { uniqueBy } from '../utils/uniqueBy';
import type {
  RainbowKitWalletConnectParameters,
  Wallet,
  WalletDetailsParams,
  WalletList,
} from './Wallet';
import { computeWalletConnectMetaData } from './computeWalletConnectMetaData';

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
  walletConnectParameters?: RainbowKitWalletConnectParameters;
}

export const connectorsForWallets = (
  walletList: WalletList,
  {
    projectId,
    walletConnectParameters,
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

  const walletConnectMetaData = computeWalletConnectMetaData({
    appName,
    appDescription,
    appUrl,
    appIcon,
  });

  for (const [groupIndex, { groupName, wallets }] of walletList.entries()) {
    for (const createWallet of wallets) {
      index++;

      const wallet = createWallet({
        projectId,
        appName,
        appIcon,
        // `option` is being used only for `walletConnectWallet` wallet
        options: {
          metadata: walletConnectMetaData,
          ...walletConnectParameters,
        },
        // Every other wallet that supports walletConnect flow and is not
        // `walletConnectWallet` wallet will have `walletConnectParameters` property
        walletConnectParameters: {
          metadata: walletConnectMetaData,
          ...walletConnectParameters,
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

    const walletMetaData = (
      // For now we should only use these as the additional parameters
      additionalRkParams?: Pick<
        WalletDetailsParams['rkDetails'],
        'isWalletConnectModalConnector' | 'showQrModal'
      >,
    ) => {
      return {
        rkDetails: omitUndefinedValues({
          ...walletMeta,
          groupIndex,
          groupName,
          isRainbowKitConnector: true,
          // These additional params will be used in rainbowkit react tree to
          // merge `walletConnectWallet` and `walletConnect` connector from wagmi with
          // showQrModal: true. This way we can let the user choose if they want to
          // connect via QR code or open the official walletConnect modal instead
          ...(additionalRkParams ? additionalRkParams : {}),
        }),
      };
    };

    const isWalletConnectConnector = walletMeta.id === 'walletConnect';

    if (isWalletConnectConnector) {
      connectors.push(
        createConnector(
          walletMetaData({
            isWalletConnectModalConnector: true,
            showQrModal: true,
          }),
        ),
      );
    }

    const connector = createConnector(walletMetaData());

    connectors.push(connector);
  }

  return connectors;
};
