import React from 'react';
import { useAccount } from 'wagmi';
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
  const { isConnected } = useAccount();
  const connectionStatus = useConnectionStatus();

  return !isConnected ? (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile padding="0" wide>
        <ConnectOptions onClose={onClose} />
      </DialogContent>
    </Dialog>
  ) : connectionStatus === 'unauthenticated' ? (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile padding="0">
        <SignIn />
      </DialogContent>
    </Dialog>
  ) : null;
}
