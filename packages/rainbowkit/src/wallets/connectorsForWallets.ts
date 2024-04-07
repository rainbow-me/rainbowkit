import type { CreateConnectorFn } from 'wagmi';
import { walletConnect } from 'wagmi/connectors';
import { isHexString } from '../utils/colors';
import { omitUndefinedValues } from '../utils/omitUndefinedValues';
import { uniqueBy } from '../utils/uniqueBy';
import type {
  RainbowKitWalletConnectParameters,
  WagmiConnectorInstance,
  Wallet,
  WalletList,
} from './Wallet';
import { createWagmiConnector } from './createWagmiConnector';
import { getWalletConnectMetaData } from './getWalletConnectMetaData';

interface WalletListItem extends Wallet {
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

  // If a group has no wallets, then throw an error
  for (const { wallets, groupName } of walletList) {
    if (!wallets.length) {
      throw new Error(`No wallets provided for group: ${groupName}`);
    }
  }

  const wallets: WalletListItem[] = [];
  const connectors: CreateConnectorFn[] = [];

  // Create WalletConnect metadata to later append it to the connectors
  const walletConnectMetaData = getWalletConnectMetaData({
    appName,
    appDescription,
    appUrl,
    appIcon,
  });

  // Initialize group index as 1. This is because the 'Installed' section in the connect modal
  // should be first in the list for EIP-6963 support
  let groupIndex = 1;

  // WalletConnect metadata options
  const walletConnectOptions = {
    metadata: walletConnectMetaData,
    ...walletConnectParameters,
  };

  // Iterate over each wallet list group
  for (const { groupName, wallets: groupedWallets } of walletList) {
    // For each wallet group, create each wallet
    for (const createWallet of groupedWallets) {
      // Create a wallet with all necessary parameters
      const wallet = createWallet({
        projectId,
        appName,
        appIcon,
        // `options` argument is used only for `walletConnectWallet` wallet
        options: walletConnectOptions,
        // Every other wallet that supports walletConnect flow and is not
        // `walletConnectWallet` will have `walletConnectParameters` argument
        walletConnectParameters: walletConnectOptions,
      });

      // Validate `iconAccent` property to ensure it's a hex value
      if (wallet?.iconAccent && !isHexString(wallet?.iconAccent)) {
        throw new Error(
          `Property 'iconAccent' is not a hex value for wallet: ${wallet.name}`,
        );
      }

      // Create a wallet item with group details
      // then add it to the wallets list
      wallets.push({
        ...wallet,
        groupIndex,
        groupName,
      });
    }

    // Increment groupIndex after processing each group
    groupIndex++;
  }

  // Filter out duplicate wallets by 'id' to ensure uniqueness in the list
  const uniqueWallets: WalletListItem[] = uniqueBy(wallets, 'id');

  for (const {
    createConnector,
    groupIndex,
    groupName,
    hidden,
    ...walletMeta
  } of uniqueWallets) {
    // If 'hidden' is a function and it returns true, skip to the next iteration
    if (typeof hidden === 'function' && hidden()) continue;

    // Create metadata for the wallet
    const walletMetaData: Pick<WagmiConnectorInstance, 'wallet'> = {
      wallet: omitUndefinedValues({
        ...walletMeta,
        groupIndex,
        groupName,
        isRainbowKitConnector: true,
      }),
    };

    const connector = createWagmiConnector({
      connector: createConnector,
      metaData: walletMetaData,
    });

    connectors.push(connector);

    // If 'walletConnectWallet' is used, then include an additional
    // WalletConnect connector to enable opening the official WalletConnect modal
    if (walletMeta.id === 'walletConnect') {
      const walletConnectConnector = createWagmiConnector({
        connector: walletConnect({
          projectId,
          ...walletConnectOptions,
          showQrModal: true,
        }),
        metaData: {
          ...walletMetaData,
          isWalletConnectModalConnector: true,
        },
      });

      connectors.push(walletConnectConnector);
    }
  }

  return connectors;
};
