import { Connector, CreateConnectorFn, useConfig, useConnect } from 'wagmi';
import { connectMutationOptions } from 'wagmi/query';
import { RainbowKitChain } from '../../components/RainbowKitProvider/RainbowKitChainContext';
import { WalletInstance } from '../../wallets/Wallet';
import { addRecentWalletId } from '../../wallets/recentWalletIds';

const MAX_REFETCH_ATTEMPTS = 5;

type WalletConnectUriListener = (uri: string) => void;

interface ConnectParameters {
  config: ReturnType<typeof useConfig>;
  walletConnectWallet: WalletInstance;
  chainId?: number;
  chains: RainbowKitChain[];
  connectAsync:
    | ReturnType<typeof connectMutationOptions>['mutationFn']
    | ReturnType<typeof useConnect>['connectAsync'];
}

interface CreateWalletConnectModalConnectorParameters {
  config: ReturnType<typeof useConfig>;
  createConnector: CreateConnectorFn;
}

export function createWalletConnectStore() {
  const walletConnectUriListeners: Set<WalletConnectUriListener> = new Set();
  let walletConnectUri: string | null = null;
  let walletId: string | null = null;
  let refetchAttempts = 0;
  let walletConnectModalConnector: Connector | null = null;

  function notifyWalletConnectUriListeners(uri: string): void {
    for (const transactionListener of walletConnectUriListeners) {
      transactionListener(uri);
    }
  }

  function requestWalletConnectUri({
    config,
    walletConnectWallet,
    chainId,
    chains,
    connectAsync,
  }: ConnectParameters) {
    walletConnectUri = null;

    const connectAsyncPromise = async () => {
      const provider = await walletConnectWallet.getProvider();

      // @ts-expect-error
      provider.once('display_uri', (uri: string) => {
        if (uri) {
          walletConnectUri = uri;
          notifyWalletConnectUriListeners(uri);
        }
      });

      const walletChainId = await walletConnectWallet.getChainId();

      try {
        const result = await connectAsync({
          chainId:
            chainId ??
            chains.find(({ id }) => id === walletChainId)?.id ??
            chains[0]?.id,
          connector: walletConnectWallet,
        });

        if (result) {
          const currentWalletId = getCurrentWalletId();
          if (currentWalletId) addRecentWalletId(currentWalletId);
          walletId = null;
          walletConnectUri = null;
          refetchAttempts = 0;
        }
      } catch {
        const isConnected = config.state.status === 'connected';
        if (!isConnected && refetchAttempts < MAX_REFETCH_ATTEMPTS) {
          walletConnectUri = null;
          refetchAttempts++;
          connectAsyncPromise();
        }
      }
    };

    connectAsyncPromise();
  }

  function onWalletConnectUri(listener: WalletConnectUriListener) {
    walletConnectUriListeners.add(listener);
    return () => {
      walletConnectUriListeners.delete(listener);
    };
  }

  function createWalletConnectModalConnector({
    createConnector,
    config,
  }: CreateWalletConnectModalConnectorParameters) {
    if (!walletConnectModalConnector) {
      const connector = config._internal.connectors.setup(createConnector);
      walletConnectModalConnector = connector;
    }
  }

  function getWalletConnectUri() {
    return walletConnectUri;
  }

  function getWalletConnectModalConnector() {
    return walletConnectModalConnector;
  }

  function setCurrentWalletId(id?: string) {
    walletId = id ?? null;
  }

  function getCurrentWalletId() {
    return walletId;
  }

  function resetWalletConnectUri() {
    walletConnectUri = null;
  }

  return {
    createWalletConnectModalConnector,
    requestWalletConnectUri,
    onWalletConnectUri,
    getWalletConnectUri,
    setCurrentWalletId,
    getCurrentWalletId,
    getWalletConnectModalConnector,
    resetWalletConnectUri,
  };
}

export type WalletConnectStore = ReturnType<typeof createWalletConnectStore>;
