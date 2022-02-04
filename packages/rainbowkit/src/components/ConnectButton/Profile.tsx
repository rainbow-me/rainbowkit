import React, { useRef, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DropdownIcon } from '../Icons/Dropdown';
import { Text } from '../Text/Text';
import { ProfilePillImageClassName } from './Profile.css';
import { formatAddress } from './formatAddress';

export function Profile() {
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const [{ data: accountData }, disconnect] = useAccount({
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
              {Number(ethBalance).toPrecision(3)} ETH
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

      <Dialog
        initialFocusRef={initialFocusRef}
        onClose={() => setOpen(false)}
        open={open}
        titleId={titleId}
      >
        <Box display="flex" flexDirection="column" gap="24">
          <Text
            as="h1"
            color="modalText"
            id={titleId}
            ref={initialFocusRef}
            size="23"
            tabIndex={-1}
          >
            {accountName}
          </Text>
          <Box
            as="button"
            color="modalText"
            fontFamily="body"
            onClick={disconnect}
            type="button"
          >
            Disconnect
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
