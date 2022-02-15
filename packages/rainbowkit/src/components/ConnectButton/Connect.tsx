import React, { useState } from 'react';
import { Box } from '../Box/Box';
import { ConnectModal } from '../ConnectModal/ConnectModal';

export function Connect() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Box background="connectButtonBackground" borderRadius="connectButton">
          <Box
            as="button"
            background="connectButtonInnerBackground"
            borderColor={
              open ? 'connectedProfileBorder' : 'connectButtonBackground'
            }
            borderRadius="connectButton"
            borderStyle="solid"
            borderWidth="2"
            boxShadow="connectButton"
            color="connectButtonText"
            fontFamily="body"
            fontWeight="bold"
            onClick={() => setOpen(true)}
            padding="8"
            type="button"
          >
            Connect Wallet
          </Box>
        </Box>
      </div>

      <ConnectModal onClose={() => setOpen(false)} open={open} />
    </>
  );
}
