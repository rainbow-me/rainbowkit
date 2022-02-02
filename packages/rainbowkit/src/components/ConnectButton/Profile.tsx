import React, { useRef, useState } from 'react';
import { useAccount } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { Text } from '../Text/Text';
import { formatAddress } from './formatAddress';

export function Profile() {
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  if (!accountData) {
    return null;
  }

  const titleId = 'rk_profile_title';
  const accountName =
    accountData.ens?.name ?? formatAddress(accountData.address);

  return (
    <>
      <div>
        <Box
          as="button"
          background="connectButtonBackground"
          borderRadius="connectButton"
          boxShadow="connectButton"
          color="connectButtonText"
          onClick={() => setOpen(true)}
          padding="8"
          type="button"
        >
          {accountData.ens?.avatar ? (
            <img alt="ENS Avatar" src={accountData.ens.avatar} />
          ) : null}
          {accountName}
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
