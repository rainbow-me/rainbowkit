import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useMainnetEnsAvatar } from '../../hooks/useMainnetEnsAvatar';
import { useMainnetEnsName } from '../../hooks/useMainnetEnsName';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';
import { useRainbowKitWagmiState } from '../RainbowKitProvider/RainbowKitWagmiStateProvider';

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ onClose, open }: AccountModalProps) {
  const { address } = useAccount();
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { setIsDisconnecting } = useRainbowKitWagmiState();

  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => setIsDisconnecting(false),
      onError: () => setIsDisconnecting(false),
    },
  });

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
              ensAvatar={ensAvatar}
              ensName={ensName}
              onClose={onClose}
              onDisconnect={() => {
                onClose();
                setIsDisconnecting(true);
                disconnect();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
