import { CreateConnectorFn } from "wagmi";
import { isHexString } from "../utils/colors";
import { omitUndefinedValues } from "../utils/omitUndefinedValues";
import { Wallet, WalletList } from "./Wallet";

interface WalletListItem extends Wallet {
  index: number;
  groupIndex: number;
  groupName: string;
}

export const connectorsForWallets = (
  walletList: WalletList
): CreateConnectorFn[] => {
  let index = -1;

  const connectors: CreateConnectorFn[] = [];
  const visibleWallets: WalletListItem[] = [];
  const potentiallyHiddenWallets: WalletListItem[] = [];

  // First collect all list items in the correct order, but keep
  // track of which ones have a `hidden` function so we can
  // evaluate them after all the visible wallet instances have
  // been created. This is because the potentially hidden wallets
  // need access to the list of resolved wallet instances so that
  // they can decide whether or not they should be hidden,
  // e.g. the "Injected Wallet" option hides itself if another
  // injected wallet is available.
  walletList.forEach(({ groupName, wallets }, groupIndex) => {
    wallets.forEach((wallet) => {
      index++;

      // guard against non-hex values for `iconAccent`
      if (wallet?.iconAccent && !isHexString(wallet?.iconAccent)) {
        throw new Error(
          `Property \`iconAccent\` is not a hex value for wallet: ${wallet.name}`
        );
      }

      const walletListItem = {
        ...wallet,
        groupIndex,
        groupName,
        index,
      };

      if (typeof wallet.hidden === "function") {
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

  walletListItems.forEach(
    ({ createConnector, groupIndex, groupName, hidden, ...walletMeta }) => {
      if (typeof hidden === "function") {
        // Run the function to check if the wallet needs to be hidden
        const isHidden = hidden();

        // If wallet is hidden, bail out and proceed to the next list item
        if (isHidden) {
          return;
        }
      }

      const connector = createConnector()(
        omitUndefinedValues({
          ...walletMeta,
          groupIndex,
          groupName,
          isRainbowKitConnector: true,
        })
      );

      connectors.push(connector);
    }
  );

  return connectors;
};
