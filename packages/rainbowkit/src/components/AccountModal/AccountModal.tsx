import React from 'react';
import { useAccount, useBalance, useEnsAvatar, useEnsName } from 'wagmi';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';

export interface AccountModalProps {
  accountData: ReturnType<typeof useAccount>['data'];
  balanceData: ReturnType<typeof useBalance>['data'];
  ensAvatar: ReturnType<typeof useEnsAvatar>['data'];
  ensName: ReturnType<typeof useEnsName>['data'];
  open: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

export function AccountModal({
  accountData,
  balanceData,
  ensAvatar,
  ensName,
  onClose,
  onDisconnect,
  open,
}: AccountModalProps) {
  if (!accountData) {
    return null;
  }

  const titleId = 'rk_account_modal_title';

  return (
    <>
      {accountData && (
        <Dialog onClose={onClose} open={open} titleId={titleId}>
          <DialogContent bottomSheetOnMobile padding="0">
            <ProfileDetails
              accountData={accountData}
              balanceData={balanceData}
              ensAvatar={ensAvatar}
              ensName={ensName}
              onClose={onClose}
              onDisconnect={onDisconnect}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
