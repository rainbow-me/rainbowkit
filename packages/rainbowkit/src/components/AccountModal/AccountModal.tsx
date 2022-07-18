import React from 'react';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ onClose, open }: AccountModalProps) {
  const { address } = useAccount();

  const { data: balanceData } = useBalance({
    addressOrName: address,
  });

  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
    chainId: 1,
  });

  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  });

  const { disconnect } = useDisconnect();

  if (!address) {
    return null;
  }

  const titleId = 'rk_account_modal_title';

  return (
    <>
      {address && (
        <Dialog onClose={onClose} open={open} titleId={titleId}>
          <DialogContent bottomSheetOnMobile padding="0">
            <ProfileDetails
              address={address}
              balanceData={balanceData}
              ensAvatar={ensAvatar}
              ensName={ensName}
              onClose={onClose}
              onDisconnect={disconnect}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
