import { Connector, useConfig, useConnect } from 'wagmi';
import { useWalletConnectStore } from '../components/RainbowKitProvider/WalletConnectStoreProvider';
import { indexBy } from '../utils/indexBy';
import { getWalletsFromConnectors } from '../utils/wallets';
import {
  useInitialChainId,
  useRainbowKitChains,
} from './../components/RainbowKitProvider/RainbowKitChainContext';
import { WalletInstance } from './Wallet';
import {
  getDesktopDownloadUrl,
  getExtensionDownloadUrl,
  getMobileDownloadUrl,
} from './downloadUrls';
import {
  connectorsWithRecentWallets,
  isEIP6963Connector,
  isRainbowKitConnector,
  isRecentWallet,
} from './groupedWallets';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connectWallet: () => Promise<void>;
  recent: boolean;
  mobileDownloadUrl?: string;
  extensionDownloadUrl?: string;
  desktopDownloadUrl?: string;
  getDesktopUri?: () => Promise<string>;
  getQrCodeUri?: () => Promise<string>;
  getMobileUri?: () => Promise<string>;
}

export function useWalletConnectors(
  mergeEIP6963WithRkConnectors = false,
): WalletConnector[] {
  const config = useConfig();
  const rainbowKitChains = useRainbowKitChains();
  const initialChainId = useInitialChainId();
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect();

  const { getWalletConnectUri, setCurrentWalletId } = useWalletConnectStore();

  const defaultConnectors = getWalletsFromConnectors({
    connectors: defaultConnectors_untyped,
  });

  async function connectWallet(connector: Connector) {
    const walletChainId = await connector.getChainId();
    const result = await connectAsync({
      chainId:
        // The goal here is to ensure users are always on a supported chain when connecting.
        // If an `initialChain` prop was provided to RainbowKitProvider, use that.
        initialChainId ??
        // Otherwise, if the wallet is already on a supported chain, use that to avoid a chain switch prompt.
        rainbowKitChains.find(({ id }) => id === walletChainId)?.id ??
        // Finally, fall back to the first chain provided to RainbowKitProvider.
        rainbowKitChains[0]?.id,
      connector,
    });

    if (result) {
      addRecentWalletId(connector.id);
    }
  }

  const pollForWalletConnectUri = (
    uriConverter: (uri: string) => string,
  ): Promise<string> => {
    // If WalletConnect URI is not found, then poll for it.
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        const walletConnectUri = getWalletConnectUri();
        if (walletConnectUri) {
          clearInterval(intervalId);
          resolve(
            uriConverter ? uriConverter(walletConnectUri) : walletConnectUri,
          );
        }
      }, 1000);
    });
  };

  const getUri = async (
    connector: Connector,
    uriConverter: (uri: string) => string,
  ): Promise<string> => {
    if (connector.id === 'coinbase') {
      const provider = await connector.getProvider();
      // @ts-expect-error
      return provider.qrUrl;
    }

    const walletConnectUri = getWalletConnectUri();

    if (walletConnectUri) {
      return uriConverter(walletConnectUri);
    }

    return pollForWalletConnectUri(uriConverter);
  };

  const waitUntilConnected = async (id: string): Promise<void> => {
    setCurrentWalletId(id);
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        const isConnected = config.state.status === 'connected';
        if (isConnected) {
          clearInterval(intervalId);
          resolve();
        }
      }, 1000);
    });
  };

  const eip6963Connectors = defaultConnectors
    .filter(isEIP6963Connector)
    .map((connector) => {
      return {
        ...connector,
        groupIndex: 0,
      };
    });

  const rainbowKitConnectors = defaultConnectors
    .filter(isRainbowKitConnector)
    .filter((wallet) => {
      if (!mergeEIP6963WithRkConnectors) return true;

      const existsInEIP6963Connectors = eip6963Connectors.some(
        (eip6963) => eip6963.id === wallet.rdns,
      );

      return !existsInEIP6963Connectors;
    });

  const combinedConnectors = [...eip6963Connectors, ...rainbowKitConnectors];

  const walletInstanceById = indexBy(
    combinedConnectors,
    (walletInstance) => walletInstance.id,
  );

  const MAX_RECENT_WALLETS = 3;

  const recentWallets: WalletInstance[] = getRecentWalletIds()
    .map((walletId) => walletInstanceById[walletId])
    .filter(Boolean)
    .slice(0, MAX_RECENT_WALLETS);

  const walletConnectors: WalletConnector[] = [];

  const combinedConnectorsWithRecentWallets = connectorsWithRecentWallets({
    wallets: combinedConnectors,
    recentWallets: recentWallets,
  });

  for (const wallet of combinedConnectorsWithRecentWallets) {
    if (!wallet) continue;

    const eip6963 = isEIP6963Connector(wallet);

    const recent = isRecentWallet(recentWallets, wallet.id);

    if (eip6963) {
      walletConnectors.push({
        ...wallet,
        iconUrl: wallet.icon!,
        ready: true,
        connectWallet: () => connectWallet(wallet),
        groupName: 'Installed',
        recent,
      });

      continue;
    }

    const isWalletConnectConnector = wallet.connectorId === 'walletConnect';

    walletConnectors.push({
      ...wallet,
      ready: wallet.installed ?? true,
      connectWallet: () =>
        isWalletConnectConnector
          ? waitUntilConnected(wallet.id)
          : connectWallet(wallet),
      desktopDownloadUrl: getDesktopDownloadUrl(wallet),
      extensionDownloadUrl: getExtensionDownloadUrl(wallet),
      groupName: wallet.groupName,
      mobileDownloadUrl: getMobileDownloadUrl(wallet),
      getQrCodeUri: wallet.qrCode?.getUri
        ? () => getUri(wallet, wallet.qrCode!.getUri!)
        : undefined,
      getDesktopUri: wallet.desktop?.getUri
        ? () => getUri(wallet, wallet.desktop!.getUri!)
        : undefined,
      getMobileUri: wallet.mobile?.getUri
        ? () => getUri(wallet, wallet.mobile?.getUri!)
        : undefined,
      recent,
    });
  }
  return walletConnectors;
}
