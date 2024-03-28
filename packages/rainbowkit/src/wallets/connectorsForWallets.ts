import type { CreateConnectorFn } from 'wagmi';
import { createConnector as createWagmiConnector } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import type {
  RainbowKitWalletConnectParameters,
  Wallet,
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

  // biome-ignore lint/complexity/noForEach: TODO
  walletList.forEach(({ groupName, wallets }, groupIndex) => {
    // biome-ignore lint/complexity/noForEach: TODO
    wallets.forEach((createWallet) => {
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
    });
  });

  // We process the known visible wallets first so that the potentially
  // hidden wallets have access to the complete list of resolved wallets
  const walletListItems: WalletListItem[] = [
    ...visibleWallets,
    ...potentiallyHiddenWallets,
  ];

  for (const {
    createConnector: createRainbowKitConnector,
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

    const rainbowKitDetails = {
      rkDetails: omitUndefinedValues({
        ...walletMeta,
        groupIndex,
        groupName,
        isRainbowKitConnector: true,
      }),
    };

    const connector = createWagmiConnector((config) => ({
      ...createRainbowKitConnector(config),
      ...rainbowKitDetails,
    }));

    connectors.push(connector);

    if (walletMeta.id === 'walletConnect') {
      const walletConnectConnector = createWagmiConnector((config) => ({
        ...walletConnect({
          projectId,
          metadata: walletConnectMetaData,
          ...walletConnectParameters,
          showQrModal: true,
        })(config),
        ...rainbowKitDetails,
        isWalletConnectModalConnector: true,
      }));

      connectors.push(walletConnectConnector);
    }
  }

  return connectors;
};
