import { type Config, type Connector, useConnect } from 'wagmi';
import type { ConnectMutateAsync } from 'wagmi/query';
import { useWalletConnectOpenState } from '../components/RainbowKitProvider/ModalContext';
import { indexBy } from '../utils/indexBy';
import {
  useInitialChainId,
  useRainbowKitChains,
} from './../components/RainbowKitProvider/RainbowKitChainContext';
import type { WagmiConnectorInstance, WalletInstance } from './Wallet';
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
  rainbowKitConnectorWithWalletConnect,
} from './groupedWallets';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connect: () => ReturnType<ConnectMutateAsync<Config, unknown>>;
  showWalletConnectModal?: () => void;
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
  const rainbowKitChains = useRainbowKitChains();
  const intialChainId = useInitialChainId();
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect();
  const defaultCreatedConnectors =
    defaultConnectors_untyped as WagmiConnectorInstance[];

  const { setIsWalletConnectModalOpen } = useWalletConnectOpenState();

  const defaultConnectors = defaultCreatedConnectors.map((connector) => ({
    ...connector,
    // rkDetails is optional it does not exist in eip6963 connectors.
    // We only inject `rkDetails` in `connectorsForWallets` when we
    // want to have additional information in the connector.
    ...(connector.rkDetails || {}),
  })) as WalletInstance[];

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
    walletConnectModalConnector: Connector,
  ) {
    try {
      setIsWalletConnectModalOpen(true);
      await connectWallet(walletConnectModalConnector);
      setIsWalletConnectModalOpen(false);
    } catch (err) {
      const isUserRejection =
        // @ts-expect-error - Web3Modal v1 error name
        err.name === 'UserRejectedRequestError' ||
        // @ts-expect-error - Web3Modal v2 error message on desktop
        err.message === 'Connection request reset. Please try again.';

      setIsWalletConnectModalOpen(false);

      if (!isUserRejection) {
        throw err;
      }
    }
  }

  const getWalletConnectUri = async (
    connector: Connector,
    uriConverter: (uri: string) => string,
  ): Promise<string> => {
    const provider = await connector.getProvider();

    if (connector.id === 'coinbase') {
      // @ts-expect-error
      return provider.qrUrl;
    }

    return new Promise<string>((resolve) =>
      // Wagmi v2 doesn't have a return type for provider yet
      // @ts-expect-error
      provider.once('display_uri', (uri) => {
        resolve(uriConverter(uri));
      }),
    );
  };

  const walletConnectModalConnector = defaultConnectors.find(
    (connector) =>
      connector.id === 'walletConnect' &&
      connector.isWalletConnectModalConnector,
  );

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
    .filter((wallet) => !wallet.isWalletConnectModalConnector)
    .filter((wallet) => {
      if (!mergeEIP6963WithRkConnectors) return true;

      const existsInEIP6963Connectors = eip6963Connectors.some(
        (eip6963) => eip6963.id === wallet.rdns,
      );

      return !existsInEIP6963Connectors;
    })
    .map((wallet) =>
      rainbowKitConnectorWithWalletConnect(
        wallet,
        walletConnectModalConnector!,
      ),
    );

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
        connect: () => connectWallet(wallet),
        groupName: 'Installed',
        recent,
      });

      continue;
    }

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
  }
  return walletConnectors;
}
