import type { CreateConnectorFn } from 'wagmi';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import type { Wallet, WalletDetailsParams, WalletList } from './Wallet';
import { wcId } from './walletConnectors/walletConnectWallet/walletConnectWallet';

interface WalletListItem extends Wallet {
  index: number;
  groupIndex: number;
  groupName: string;
}

/*
  Assemble a list of low-level connectors for use with the
  `WalletButton` and `RainbowButton` components in custom implementations.
*/
export function connectorsForWallets(
  wallets: Wallet[] | WalletList,
): CreateConnectorFn[];

/*
  Overload implementation for `connectorsForWallets`.
  1. Returns a `connectors` function that will then return a Connectors array
  2. Returns a prepared Connectors array stuffed with dummy WalletList data
*/
export function connectorsForWallets(walletList: any) {
  if ('groupName' in walletList[0]) {
    return _connectorsForWallets(walletList);
  }
  return _connectorsForWallets([
    {
      groupName: '',
      wallets: walletList as Wallet[],
    },
  ]);
}

export const _connectorsForWallets = (
  walletList: WalletList,
): CreateConnectorFn[] => {
  let index = -1;

  const connectors: CreateConnectorFn[] = [];
  const visibleWallets: WalletListItem[] = [];
  const potentiallyHiddenWallets: WalletListItem[] = [];

  // biome-ignore lint/complexity/noForEach: TODO
  walletList.forEach(({ groupName, wallets }, groupIndex) => {
    // biome-ignore lint/complexity/noForEach: TODO
    wallets.forEach((wallet) => {
      index++;

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
    });
  });

  // We process the known visible wallets first so that the potentially
  // hidden wallets have access to the complete list of resolved wallets
  const walletListItems: WalletListItem[] = [
    ...visibleWallets,
    ...potentiallyHiddenWallets,
  ];

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

    const isWalletConnectConnector = walletMeta.id === wcId;

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
