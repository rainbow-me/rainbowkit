import React from 'react';
import { useAccount } from 'wagmi';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';
import { TxList } from '../Txs/TxList';

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ onClose, open }: AccountModalProps) {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

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
              onClose={onClose}
              onDisconnect={() => disconnect()}
            />
          </DialogContent>
          <DialogContent marginTop="24">
            <TxList />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
