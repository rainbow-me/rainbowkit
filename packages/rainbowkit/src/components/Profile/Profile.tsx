import React, { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Box } from '../Box/Box';
import { formatAddress } from '../ConnectButton/formatAddress';
import { DropdownIcon } from '../Icons/Dropdown';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import { ProfilePillImageClassName } from './Profile.css';

export function Profile() {
  const [open, setOpen] = useState(false);
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });

  const [{ data: balanceData }] = useBalance({
    addressOrName: accountData?.address,
  });

  if (!accountData) {
    return null;
  }

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
          onClick={() => setOpen(true)}
          type="button"
        >
          {balanceData && (
            <Box padding="8" paddingLeft="12">
              {ethBalanceFormatted} {balanceData.symbol}
            </Box>
          )}
          <Box
            background="connectButtonInnerBackground"
            borderColor={
              open ? 'connectedProfileBorder' : 'connectButtonBackground'
            }
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

      <ProfileModal onClose={() => setOpen(false)} open={open} />
    </>
  );
}
