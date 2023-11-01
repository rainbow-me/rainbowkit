import { Connector, useConnect } from "wagmi";
import { flatten } from "../utils/flatten";
import { indexBy } from "../utils/indexBy";
import { isNotNullish } from "../utils/isNotNullish";
import {
  useInitialChainId,
  useRainbowKitChains,
} from "./../components/RainbowKitProvider/RainbowKitChainContext";
import {
  getDesktopDownloadUrl,
  getExtensionDownloadUrl,
  getMobileDownloadUrl,
} from "./downloadUrls";
import { addRecentWalletId, getRecentWalletIds } from "./recentWalletIds";
import { useRainbowKitWallets } from "../components/RainbowKitProvider/RainbowKitWalletsProvider";

export interface WalletConnector extends Connector {
  recent: boolean;
  mobileDownloadUrl?: string;
  extensionDownloadUrl?: string;
  desktopDownloadUrl?: string;
}

export function useWalletConnectors(): WalletConnector[] {
  const rainbowKitChains = useRainbowKitChains();
  const intialChainId = useInitialChainId();
  const rainbowKitWallets = useRainbowKitWallets();
  const { connectAsync, connectors } = useConnect();

  async function connectWallet(connector: Connector) {
    const walletChainId = await connector.getChainId();
    connector.getProvider().then((res) => {
      // @ts-ignore
      res.once("display_uri", () => {
        console.log("HUH?");
      });
    });
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

  const walletInstanceById = indexBy(
    connectors as Connector[],
    (walletInstance) => walletInstance.id
  );

  const MAX_RECENT_WALLETS = 3;

  const recentWallets = getRecentWalletIds()
    .map((walletId) => walletInstanceById[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS);

  const installedConnectors: WalletConnector[] = [];

  connectors.forEach((wallet: Connector) => {
    if (!wallet) return;

    const isWalletConnectModal = wallet.id === "walletConnect";

    const recent = recentWallets.includes(wallet);

    installedConnectors.push({
      ...wallet,
      connect: () => connectWallet(wallet),
      /*  desktopDownloadUrl: getDesktopDownloadUrl(wallet),
      extensionDownloadUrl: getExtensionDownloadUrl(wallet),
      mobileDownloadUrl: getMobileDownloadUrl(wallet), */
      recent,
    });
  });
  return installedConnectors;
}
