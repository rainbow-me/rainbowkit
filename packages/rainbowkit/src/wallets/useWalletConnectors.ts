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
  showWalletConnectModal?: () => void;
  recent: boolean;
  mobileDownloadUrl?: string;
  extensionDownloadUrl?: string;
  desktopDownloadUrl?: string;
  getDesktopUri?: () => Promise<string>;
  getQrCodeUri?: () => Promise<string>;
  getMobileUri?: () => Promise<string>;
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

  async function connectToWalletConnectModal(
    walletConnectModalConnector: Connector
  ) {
    try {
      return await connectWallet(walletConnectModalConnector);
    } catch (err) {
      const isUserRejection =
        // @ts-expect-error - Web3Modal v1 error name
        err.name === "UserRejectedRequestError" ||
        // @ts-expect-error - Web3Modal v2 error message on desktop
        err.message === "Connection request reset. Please try again.";

      if (!isUserRejection) {
        throw err;
      }
    }
  }

  const walletConnectModalConnector = defaultConnectors.find(
    (connector) =>
      connector.id === "walletConnect" &&
      connector.isWalletConnectModalConnector
  );

  const walletInstances = defaultConnectors
    .filter(
      (connector) =>
        !connector.isWalletConnectModalConnector &&
        connector.isRainbowKitConnector
    )
    .map((connector) => {
      // Check if we should use the walletConnectModalConnector for this instance
      const shouldUseWalletConnectModal =
        connector.id === "walletConnect" && walletConnectModalConnector;

      // Include the walletConnectModalConnector in the result
      return shouldUseWalletConnectModal
        ? { ...connector, walletConnectModalConnector }
        : connector;
    });

  const walletInstanceById = indexBy(
    walletInstances,
    (walletInstance) => walletInstance.id
  );

  const getWalletConnectUri = async (
    connector: Connector,
    uriConverter: (uri: string) => string
  ): Promise<string> => {
    const provider = await connector.getProvider();

    if (connector.id === "coinbase") {
      // @ts-expect-error
      return provider.qrUrl;
    }

    return new Promise<string>((resolve) =>
      // Wagmi v2 doesn't have a return type for provider yet
      // @ts-expect-error
      provider.once("display_uri", (uri) => {
        resolve(uriConverter(uri));
      })
    );
  };

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
      ready: wallet.installed ?? true,
      connect: () => connectWallet(wallet),
      desktopDownloadUrl: getDesktopDownloadUrl(wallet),
      extensionDownloadUrl: getExtensionDownloadUrl(wallet),
      groupName: wallet.groupName,
      mobileDownloadUrl: getMobileDownloadUrl(wallet),
      getQrCodeUri: wallet.qrCode?.getUri
        ? () => getWalletConnectUri(wallet, wallet.qrCode!.getUri!)
        : undefined,
      getDesktopUri: wallet.desktop?.getUri
        ? () => getWalletConnectUri(wallet, wallet.desktop!.getUri!)
        : undefined,
      getMobileUri: wallet.mobile?.getUri
        ? () => getWalletConnectUri(wallet, wallet.mobile?.getUri!)
        : undefined,
      recent,
      showWalletConnectModal: wallet.walletConnectModalConnector
        ? () => connectToWalletConnectModal(wallet.walletConnectModalConnector!)
        : undefined,
    });
  });
  return walletConnectors;
}
