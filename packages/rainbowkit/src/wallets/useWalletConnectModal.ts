import { useCallback } from 'react';
import { Connector, useConnect } from 'wagmi';
import { useWalletConnectOpenState } from '../components/RainbowKitProvider/ModalContext';
import {
  useInitialChainId,
  useRainbowKitChains,
} from '../components/RainbowKitProvider/RainbowKitChainContext';

import { useWalletConnectStore } from '../components/RainbowKitProvider/WalletConnectStoreProvider';
import { addRecentWalletId } from './recentWalletIds';

export function useWalletConnectModal() {
  const rainbowKitChains = useRainbowKitChains();
  const initialChainId = useInitialChainId();
  const { setIsWalletConnectModalOpen } = useWalletConnectOpenState();

  const { connectAsync } = useConnect();

  const { getWalletConnectModalConnector, resetWalletConnectUri } =
    useWalletConnectStore();

  async function connectWallet(connector: Connector) {
    const walletChainId = await connector.getChainId();

    const result = await connectAsync({
      chainId:
        initialChainId ??
        rainbowKitChains.find(({ id }) => id === walletChainId)?.id ??
        rainbowKitChains[0]?.id,
      connector,
    });

    if (result) {
      addRecentWalletId(connector.id);
    }
  }

  const openWalletConnectModal = useCallback(async () => {
    const walletConnectModalConnector = getWalletConnectModalConnector();

    if (walletConnectModalConnector) {
      try {
        setIsWalletConnectModalOpen(true);
        await connectWallet({
          ...walletConnectModalConnector,
          id: 'walletConnect',
        });
        resetWalletConnectUri();
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
  }, [
    getWalletConnectModalConnector,
    resetWalletConnectUri,
    setIsWalletConnectModalOpen,
  ]);

  return { openWalletConnectModal };
}
