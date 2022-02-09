import React, { useRef, useState } from 'react';
import { Box } from '../Box/Box';
import ConnectOptions from '../ConnectOptions/ConnectOptions';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';

export function Connect() {
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const titleId = 'rk_connect_title';

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

      <Dialog
        initialFocusRef={initialFocusRef}
        onClose={() => setOpen(false)}
        open={open}
        titleId={titleId}
      >
        <DialogContent>
          <ConnectOptions initialFocusRef={initialFocusRef} />
        </DialogContent>
      </Dialog>
    </>
  );
}
