import React from 'react';
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
      <Dialog onClose={onClose} open={open} titleId={titleId}>
        <DialogContent bottomSheetOnMobile padding="0">
          <SignIn onClose={onClose} />
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
