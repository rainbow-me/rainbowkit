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
  children: (renderProps: {
    ready: boolean;
    connect: () => void;
    loading: boolean;
    error: string;
    connector: WalletConnector;
  }) => ReactNode;
}

export function WalletButtonRenderer({ children }: WalletButtonRendererProps) {
  const mounted = useIsMounted();
  const { openConnectModal } = useConnectModal();
  const { connectModalOpen } = useModalState();
  const { connector, setConnector } = useContext(RainbowButtonContext);
  const [firstConnector] = useWalletConnectors()
    .filter((wallet) => wallet.ready)
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

  useAccount({
    onConnect: () => {
      // If you get error on desktop and switch to mobile view
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

  return (
    <>
      {children({
        ready: firstConnector && mounted && connectionStatus !== 'loading',
        connector: firstConnector,
        loading,
        error,
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

WalletButtonRenderer.displayName = 'WalletButton.Custom';
