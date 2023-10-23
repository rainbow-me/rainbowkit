import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount } from 'wagmi';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { useIsMounted } from '../../hooks/useIsMounted';
import { isMobile } from '../../utils/isMobile';
import {
  addLatestWalletId,
  clearLatestWalletId,
  getLatestWalletId,
} from '../../wallets/latestWalletId';
import {
  WalletConnector,
  useWalletConnectors,
} from '../../wallets/useWalletConnectors';
import {
  useConnectModal,
  useModalState,
} from '../RainbowKitProvider/ModalContext';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';

export interface WalletButtonRendererProps {
  wallet?: string;
  children: (renderProps: {
    error: string;
    loading: boolean;
    connected: boolean;
    ready: boolean;
    mounted: boolean;
    connector: WalletConnector;
    connect: () => void;
  }) => ReactNode;
}

export function WalletButtonRenderer({
  // Wallet is the same as `connector.id` which is injected into
  // wagmi connectors
  wallet = 'rainbow',
  children,
}: WalletButtonRendererProps) {
  const mounted = useIsMounted();
  const { openConnectModal } = useConnectModal();
  const { connectModalOpen } = useModalState();
  const { connector, setConnector } = useContext(RainbowButtonContext);
  const [firstConnector] = useWalletConnectors()
    // rainbowkit / wagmi connectors can uppercase some letters on the `id` field.
    // Id for metamask is `metaMask`, so instead we will make sure it's has lowercase comparison
    .filter((_wallet) => _wallet.id.toLowerCase() === wallet.toLowerCase())
    .sort((a, b) => a.groupIndex - b.groupIndex);

  const connectionStatus = useConnectionStatus();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mobile = isMobile();

  // If modal is closed we want to setConnector to null
  // to avoid "connecting to wallet..." ui
  // biome-ignore lint/nursery/useExhaustiveDependencies: TODO
  useEffect(() => {
    if (!connectModalOpen && connector) setConnector(null);
  }, [connectModalOpen]);

  const { isConnected, isDisconnected } = useAccount({
    onConnect: () => {
      /*  const lastClickedWalletName = getRecent */
      // If you get error on desktop and thenswitch to mobile view
      // then connect your wallet the error will remain there. We will
      // reset the error in case that happens.
      if (error) setError('');
    },
    onDisconnect: clearLatestWalletId,
  });

  // biome-ignore lint/nursery/useExhaustiveDependencies: <explanation>
  const isLastWalletIdConnected = useMemo(() => {
    const lastWalletId = getLatestWalletId();

    if (!lastWalletId || !firstConnector?.id) {
      return false;
    }

    // Sometimes localstorage might not be in sync
    // if component doesn't rerender, but for if user
    // is not connected don't show them the green badge
    if (!isConnected) return false;

    return lastWalletId === firstConnector?.id;
  }, [isConnected, isDisconnected, firstConnector]);

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (error) setError('');
      await firstConnector?.connect?.();
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  // If anyone uses SIWE then we don't want them to be able to connect
  // if they are in a process of authentication
  const isStatusLoading = connectionStatus === 'loading';
  const ready = !!openConnectModal && firstConnector && !isStatusLoading;

  const isNotSupported = !firstConnector?.installed || !firstConnector?.ready;

  return (
    <>
      {children({
        error,
        loading,
        connected: isLastWalletIdConnected,
        ready,
        mounted,
        connector: firstConnector,
        connect: async () => {
          // Used to track which last wallet user has clicked
          // we can then use this value to show connected green badge
          // for our custom Wallet Button API
          addLatestWalletId(firstConnector?.id || '');

          // If openConnectModal is true and user is on mobile or
          // if user hasn't installed the connector then we prompt them
          // to rainbowkit connect modal
          if (mobile || isNotSupported) {
            openConnectModal?.();
            setConnector(firstConnector);
            return;
          }

          connectWallet();
        },
      })}
    </>
  );
}
