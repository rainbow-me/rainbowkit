import React, { ReactNode, useContext, useEffect } from "react";
import { useConnectionStatus } from "../../hooks/useConnectionStatus";
import { useIsMounted } from "../../hooks/useIsMounted";
import { useWalletConnectors } from "../../wallets/useWalletConnectors";
import {
  useConnectModal,
  useModalState,
} from "../RainbowKitProvider/ModalContext";
import { RainbowButtonContext } from "../RainbowKitProvider/RainbowButtonContext";

export interface WalletButtonRendererProps {
  children: (renderProps: { ready: boolean; connect: () => void }) => ReactNode;
}

export function WalletButtonRenderer({ children }: WalletButtonRendererProps) {
  const mounted = useIsMounted();
  const { openConnectModal } = useConnectModal();
  const { connectModalOpen } = useModalState();
  const { connector, setConnector } = useContext(RainbowButtonContext);
  const [rainbowWallet] = useWalletConnectors("rainbow");
  const connectionStatus = useConnectionStatus();

  // If modal is closed we want to setConnector to null
  // to avoid "connecting to wallet..." ui
  // biome-ignore lint/nursery/useExhaustiveDependencies: TODO
  useEffect(() => {
    if (!connectModalOpen && connector) setConnector(null);
  }, [connectModalOpen]);

  return (
    <>
      {children({
        ready: mounted && connectionStatus !== "loading",
        connect: () => {
          if (openConnectModal) {
            openConnectModal();
            setConnector(rainbowWallet);
          }
        },
      })}
    </>
  );
}

WalletButtonRenderer.displayName = "WalletButton.Custom";
