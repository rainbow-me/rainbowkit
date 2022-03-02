import React from 'react';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';
import { TxList } from '../Txs/TxList';

export interface AccountModalProps {
  accountData: ReturnType<typeof useAccount>[0]['data'];
  balanceData: ReturnType<typeof useBalance>[0]['data'];
  networkData: ReturnType<typeof useNetwork>[0]['data'];
  open: boolean;
  onClose: () => void;
  onDisconnect: () => void;
}

export function AccountModal({
  accountData,
  balanceData,
  networkData,
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
          <DialogContent>
            <ProfileDetails
              accountData={accountData}
              balanceData={balanceData}
              networkData={networkData}
              onClose={onClose}
              onDisconnect={onDisconnect}
            />
          </DialogContent>
          <DialogContent bottomSheetOnMobile marginTop="24">
            <TxList accountData={accountData} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
