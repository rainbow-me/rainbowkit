import React from 'react';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import ConnectOptions from '../ConnectOptions/ConnectOptions';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { SignIn } from '../SignIn/SignIn';
import { useDisconnect } from 'wagmi';

export interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectModal({ onClose, open }: ConnectModalProps) {
  const titleId = 'rk_connect_title';
  const connectionStatus = useConnectionStatus();

  // when a user rejects the SIWE signature, close the modal and disconnect
  const { disconnect } = useDisconnect();
  const onAuthCancel = React.useCallback(() => {
    onClose();
    disconnect();
  }, [onClose, disconnect]);

  if (connectionStatus === 'disconnected') {
    return (
      <Dialog onClose={onClose} open={open} titleId={titleId}>
        <DialogContent bottomSheetOnMobile padding="0" wide>
          <ConnectOptions onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  if (connectionStatus === 'unauthenticated') {
    return (
      <Dialog onClose={onAuthCancel} open={open} titleId={titleId}>
        <DialogContent bottomSheetOnMobile padding="0">
          <SignIn onClose={onAuthCancel} />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
