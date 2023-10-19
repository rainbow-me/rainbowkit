import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { BaseError } from 'viem';
import { useAccount } from 'wagmi';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { useIsMounted } from '../../hooks/useIsMounted';
import { isMobile } from '../../utils/isMobile';
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
    .filter((_wallet) => _wallet.ready)
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

  const { isConnected: connected } = useAccount({
    onConnect: () => {
      // If you get error on desktop and thenswitch to mobile view
      // then connect your wallet the error will remain there. We will
      // reset the error in case that happens.
      if (error) setError('');
    },
  });

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (error) setError('');
      await firstConnector?.connect?.();
    } catch (err) {
      const shortErrMessage = (err as BaseError)?.shortMessage;
      const errMessage = shortErrMessage || 'Connection failed.';
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  // If anyone uses SIWE then we don't want them to be able to connect
  // if they are in a process of authentication
  const isStatusLoading = connectionStatus === 'loading';
  const ready = firstConnector && !isStatusLoading;

  return (
    <>
      {children({
        error,
        loading,
        connected,
        ready,
        mounted,
        connector: firstConnector,
        connect: () => {
          if (openConnectModal && mobile) {
            openConnectModal();
            setConnector(firstConnector);
            return;
          }

          connectWallet();
        },
      })}
    </>
  );
}
