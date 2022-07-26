import React from 'react';
import { useAccount } from 'wagmi';
import ConnectOptions from '../ConnectOptions/ConnectOptions';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { useAuthenticationStatus } from '../RainbowKitProvider/AuthenticationContext';
import { SignIn } from '../SignIn/SignIn';
export interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectModal({ onClose, open }: ConnectModalProps) {
  const titleId = 'rk_connect_title';
  const { isConnected } = useAccount();
  const authenticationStatus = useAuthenticationStatus();

  return !isConnected ? (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile padding="0" wide>
        <ConnectOptions onClose={onClose} />
      </DialogContent>
    </Dialog>
  ) : authenticationStatus === 'unauthenticated' ? (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile padding="0">
        <SignIn />
      </DialogContent>
    </Dialog>
  ) : null;
}
