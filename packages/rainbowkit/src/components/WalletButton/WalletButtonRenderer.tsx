import React, { ReactNode, useContext, useEffect, useState } from "react";
import { BaseError } from "viem";
import { useAccount, useConnect } from "wagmi";
import { useConnectionStatus } from "../../hooks/useConnectionStatus";
import { useIsMounted } from "../../hooks/useIsMounted";
import { isMobile } from "../../utils/isMobile";
import {
  WalletConnector,
  useWalletConnectors,
} from "../../wallets/useWalletConnectors";
import {
  useConnectModal,
  useModalState,
} from "../RainbowKitProvider/ModalContext";
import { RainbowButtonContext } from "../RainbowKitProvider/RainbowButtonContext";

export interface WalletButtonRendererProps {
  connectorId?: string;
  children: (renderProps: {
    ready: boolean;
    connected: boolean;
    connect: () => void;
    loading: boolean;
    error: string;
    connector: WalletConnector;
  }) => ReactNode;
}

export function WalletButtonRenderer({
  // "rainbow" by default
  connectorId = "rainbow",
  children,
}: WalletButtonRendererProps) {
  const mounted = useIsMounted();
  const { openConnectModal } = useConnectModal();
  const { connectModalOpen } = useModalState();
  const { connector, setConnector } = useContext(RainbowButtonContext);
  const [firstConnector] = useWalletConnectors()
    .filter((wallet) => wallet.ready)
    .filter((wallet) => wallet.id === connectorId)
    .sort((a, b) => a.groupIndex - b.groupIndex);

  const connectionStatus = useConnectionStatus();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      if (error) setError("");
    },
  });

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (error) setError("");
      await firstConnector?.connect?.();
    } catch (err) {
      const shortErrMessage = (err as BaseError)?.shortMessage;
      const errMessage = shortErrMessage || "Connection failed.";
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  // If anyone uses SIWE then we don't want them to be able to connect
  // if they are in a process of authentication or if they are authenticated
  const isStatusLoadingOrConnected = connectionStatus === "loading";
  const ready = firstConnector && mounted && !isStatusLoadingOrConnected;

  return (
    <>
      {children({
        ready,
        connector: firstConnector,
        loading,
        error,
        connected,
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

WalletButtonRenderer.displayName = "WalletButton.Custom";
