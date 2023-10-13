import React, { ReactNode, useContext, useEffect } from 'react';
import { useIsMounted } from '../../hooks/useIsMounted';
import {
  useConnectModal,
  useModalState,
} from '../RainbowKitProvider/ModalContext';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';

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
  const { connector, setConnector } = useContext(RainbowButtonContext);

  // If modal is closed we want to setConnector to null
  // to avoid "connecting to wallet..." ui
  // biome-ignore lint/nursery/useExhaustiveDependencies: TODO
  useEffect(() => {
    if (!connectModalOpen && connector) setConnector(null);
  }, [connectModalOpen]);

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
