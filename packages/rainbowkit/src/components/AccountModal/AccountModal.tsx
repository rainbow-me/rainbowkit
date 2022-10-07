import React from 'react';
import { useAccount, useBalance, useDisconnect, useNetwork } from 'wagmi';
import { useMainnetEnsAvatar } from '../../hooks/useMainnetEnsAvatar';
import { useMainnetEnsName } from '../../hooks/useMainnetEnsName';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';
import { RainbowKitProviderProps } from '../RainbowKitProvider/RainbowKitProvider';

export interface AccountModalProps {
  token: RainbowKitProviderProps['token'];
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ onClose, open, token }: AccountModalProps) {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: balanceData } = useBalance({
    addressOrName: address,
    chainId: token?.find(val => val.chain === chain?.id)?.chain,
    token: token?.find(val => val.chain === chain?.id)?.address,
  });
  const ensAvatar = useMainnetEnsAvatar(address);
  const ensName = useMainnetEnsName(address);
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
