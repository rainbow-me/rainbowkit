import React from 'react';
import { useAccount } from 'wagmi';
import ConnectOptions from '../ConnectOptions/ConnectOptions';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
export interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
  onConnect?: () => void;
}

export function ConnectModal({ onClose, onConnect, open }: ConnectModalProps) {
  const titleId = 'rk_connect_title';
  const { data: connectData } = useAccount();

  return !connectData ? (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile padding="0" wide>
        <ConnectOptions onClose={onClose} onConnect={onConnect} />
      </DialogContent>
    </Dialog>
  ) : null;
}
