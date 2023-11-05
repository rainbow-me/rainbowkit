import { Connector, useConnect } from "wagmi";
import { indexBy } from "../utils/indexBy";
import { isNotNullish } from "../utils/isNotNullish";
import {
  useInitialChainId,
  useRainbowKitChains,
} from "./../components/RainbowKitProvider/RainbowKitChainContext";
import { WalletInstance } from "./Wallet";
import {
  getDesktopDownloadUrl,
  getExtensionDownloadUrl,
  getMobileDownloadUrl,
} from "./downloadUrls";
import { addRecentWalletId, getRecentWalletIds } from "./recentWalletIds";

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connect: () => Promise<{
    accounts: readonly `0x${string}`[];
    chainId: number;
  }>;
  onConnecting: (fn: (data: any) => void) => void;
  showWalletConnectModal?: () => void;
  recent: boolean;
  mobileDownloadUrl?: string;
  extensionDownloadUrl?: string;
  desktopDownloadUrl?: string;
}

interface ConnectorEmitterEventParams {
  uuid?: string;
  type?: string;
  data?: any;
}

export function useWalletConnectors(): WalletConnector[] {
  const rainbowKitChains = useRainbowKitChains();
  const intialChainId = useInitialChainId();
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect();
  const defaultConnectors = defaultConnectors_untyped as WalletInstance[];

  async function connectWallet(connector: Connector) {
    const walletChainId = await connector.getChainId();
    const result = await connectAsync({
      chainId:
        // The goal here is to ensure users are always on a supported chain when connecting.
        // If an `initialChain` prop was provided to RainbowKitProvider, use that.
        intialChainId ??
        // Otherwise, if the wallet is already on a supported chain, use that to avoid a chain switch prompt.
        rainbowKitChains.find(({ id }) => id === walletChainId)?.id ??
        // Finally, fall back to the first chain provided to RainbowKitProvider.
        rainbowKitChains[0]?.id,
      connector,
    });

    if (result) {
      addRecentWalletId(connector.id);
    }

    return result;
  }

  /*   async function connectToWalletConnectModal(
    walletId: string,
    walletConnectModalConnector: Connector
  ) {
    try {
      return await connectWallet(walletId, walletConnectModalConnector!);
    } catch (err) {
      const isUserRejection =
        // @ts-expect-error - Web3Modal v2 error message on desktop
        err.message === "Connection request reset. Please try again.";

      if (!isUserRejection) {
        throw err;
      }
    }
  } */

  const walletInstances = defaultConnectors.filter(
    (connector) => connector.isRainbowKitConnector
  );

  const walletInstanceById = indexBy(
    walletInstances,
    (walletInstance) => walletInstance.id
  );

  const MAX_RECENT_WALLETS = 3;
  const recentWallets: WalletInstance[] = getRecentWalletIds()
    .map((walletId) => walletInstanceById[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS);

  const groupedWallets: WalletInstance[] = [
    ...recentWallets,
    ...walletInstances.filter(
      (walletInstance) => !recentWallets.includes(walletInstance)
    ),
  ];

  const walletConnectors: WalletConnector[] = [];

  groupedWallets.forEach((wallet: WalletInstance) => {
    if (!wallet) {
      return;
    }

    const recent = recentWallets.includes(wallet);

    walletConnectors.push({
      ...wallet,
      connect: () => connectWallet(wallet),
      desktopDownloadUrl: getDesktopDownloadUrl(wallet),
      extensionDownloadUrl: getExtensionDownloadUrl(wallet),
      groupName: wallet.groupName,
      mobileDownloadUrl: getMobileDownloadUrl(wallet),
      onConnecting: (fn: (data: any) => void) =>
        wallet.emitter.on(
          "message",
          ({ type, data }: ConnectorEmitterEventParams) =>
            type === "display_uri" ? fn(data) : undefined
        ),
      ready: wallet.installed ?? true,
      recent,
      showWalletConnectModal: undefined,
    });
  });
  return walletConnectors;
}
