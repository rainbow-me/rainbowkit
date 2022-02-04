import React, { useRef, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DropdownIcon } from '../Icons/Dropdown';
import { ProfilePillImageClassName } from './Profile.css';
import { ProfileDetails } from './ProfileDetails';
import { formatAddress } from './formatAddress';

export function Profile() {
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  const [{ data: balanceData }] = useBalance({
    addressOrName: accountData?.address,
  });

  if (!accountData) {
    return null;
  }

  const titleId = 'rk_profile_title';
  const accountName =
    accountData.ens?.name ?? formatAddress(accountData.address);

  const ethBalance = balanceData?.formatted;
  const ethBalanceFormatted = Number(ethBalance).toPrecision(3);

  return (
    <>
      <div>
        <Box
          alignItems="center"
          as="button"
          background="connectButtonBackground"
          borderRadius="connectButton"
          boxShadow="connectButton"
          color="connectButtonText"
          display="flex"
          fontFamily="body"
          fontWeight="bold"
          // height="39"
          onClick={() => setOpen(true)}
          type="button"
        >
          {balanceData && (
            <Box padding="8" paddingLeft="12">
              {ethBalanceFormatted} ETH
            </Box>
          )}
          <Box
            borderColor="connectedProfileBorder"
            borderRadius="connectButton"
            borderStyle="solid"
            borderWidth="2"
            color="connectButtonText"
            fontFamily="body"
            fontWeight="bold"
            padding="6"
          >
            <Box alignItems="center" display="flex" height="24">
              {accountData.ens?.avatar ? (
                <img
                  alt="ENS Avatar"
                  className={ProfilePillImageClassName}
                  src={accountData.ens.avatar}
                />
              ) : null}
              {accountName}
              <DropdownIcon />
            </Box>
          </Box>
        </Box>
      </div>

      {accountData && (
        <Dialog
          initialFocusRef={initialFocusRef}
          onClose={() => setOpen(false)}
          open={open}
          titleId={titleId}
        >
          <ProfileDetails onClose={() => setOpen(false)} />
        </Dialog>
      )}
    </>
  );
}
