import React, { ReactNode, useContext, useEffect } from 'react';
import { useIsMounted } from '../../hooks/useIsMounted';
import { ConnectorContext } from '../RainbowKitProvider/ConnectorContext';
import {
  useConnectModal,
  useModalState,
} from '../RainbowKitProvider/ModalContext';

const noop = () => {};

export interface WalletButtonRendererProps {
  children: (renderProps: {
    openConnectModal: () => void;
    connectModalOpen: boolean;
    mounted: boolean;
  }) => ReactNode;
}

export function WalletButtonRenderer({ children }: WalletButtonRendererProps) {
  const mounted = useIsMounted();
  const { openConnectModal } = useConnectModal();
  const { connectModalOpen } = useModalState();
  const [, setConnector] = useContext(ConnectorContext);

  useEffect(() => {
    if (!connectModalOpen) setConnector?.();
  }, [connectModalOpen, setConnector]);

  return (
    <>
      {children({
        connectModalOpen,
        mounted,
        openConnectModal: openConnectModal ?? noop,
      })}
    </>
  );
}

WalletButtonRenderer.displayName = 'WalletButton.Custom';
