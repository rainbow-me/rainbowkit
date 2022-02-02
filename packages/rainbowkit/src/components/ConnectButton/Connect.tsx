import React, { useRef, useState } from 'react';
import { useConnect } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { Text } from '../Text/Text';

export function Connect() {
  const [open, setOpen] = useState(false);
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const [{ data: connectData }, connect] = useConnect();
  const titleId = 'rk_connect_title';

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
          Connect
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
            Connect
          </Text>
          <Box display="flex" flexDirection="column" gap="18">
            {connectData.connectors.map(x => (
              <Box
                as="button"
                color={x.ready ? 'modalText' : 'modalTextSecondary'}
                disabled={!x.ready}
                fontFamily="body"
                key={x.id}
                onClick={() => connect(x)}
                type="button"
              >
                {x.name}
                {!x.ready && ' (unsupported)'}
              </Box>
            ))}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
