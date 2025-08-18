import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useProfile } from '../../hooks/useProfile';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
  nonce?: string;
}

export function AccountModal({ onClose, open, nonce }: AccountModalProps) {
  const { address } = useAccount();
  const { balance, ensAvatar, ensName } = useProfile({
    address,
    includeBalance: open,
  });
  const { disconnect } = useDisconnect();

  if (!address) {
    return null;
  }

  const titleId = 'rk_account_modal_title';

  return (
    <>
      {address && (
        <Dialog onClose={onClose} open={open} titleId={titleId} nonce={nonce}>
          <DialogContent bottomSheetOnMobile padding="0">
            <ProfileDetails
              address={address}
              ensAvatar={ensAvatar}
              ensName={ensName}
              balance={balance}
              onClose={onClose}
              onDisconnect={disconnect}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
