import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import ConnectOptions from '../ConnectOptions/ConnectOptions';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { SignIn } from '../SignIn/SignIn';

export interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectModal({ onClose, open }: ConnectModalProps) {
  const titleId = 'rk_connect_title';
  const connectionStatus = useConnectionStatus();

  const { disconnect } = useDisconnect();
  const { isConnecting } = useAccount();

  // when a user cancels or dismisses the SignIn modal for SIWE, disconnect and call onClose
  const onAuthCancel = React.useCallback(() => {
    onClose();
    disconnect();
  }, [onClose, disconnect]);

  const onConnectModalCancel = React.useCallback(() => {
    // We use this for the WalletButton. If the QR code shows up and
    // the user closes it, we need to know the wallet isn't connecting anymore.
    // So if it's connecting, we disconnect it.
    if (isConnecting) disconnect();

    onClose();
  }, [onClose, disconnect, isConnecting]);

  if (connectionStatus === 'disconnected') {
    return (
      <Dialog onClose={onConnectModalCancel} open={open} titleId={titleId}>
        <DialogContent bottomSheetOnMobile padding="0" wide>
          <ConnectOptions onClose={onConnectModalCancel} />
        </DialogContent>
      </Dialog>
    );
  }

  if (connectionStatus === 'unauthenticated') {
    return (
      <Dialog onClose={onAuthCancel} open={open} titleId={titleId}>
        <DialogContent bottomSheetOnMobile padding="0">
          <SignIn onClose={onAuthCancel} onCloseModal={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
