import React, { useEffect, useRef, useState } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { Text } from '../Text/Text';

export function Network() {
  const [open, setOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [{ data: connectData }] = useConnect();
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const titleId = 'rk_network_title';

  useEffect(() => {
    if (!connectData.connector) {
      return;
    }

    const stopSwitching = () => {
      setIsSwitching(false);
      setOpen(false);
    };

    const provider = connectData.connector.getProvider();

    provider.on('chainChanged', stopSwitching);

    return () => {
      provider.off('chainChanged', stopSwitching);
    };
  }, [connectData.connector, setIsSwitching]);

  if (!networkData || !networkData.chain) {
    return null;
  }

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
          {networkData.chain.name ?? networkData.chain.id}{' '}
          {networkData.chain?.unsupported && '(unsupported)'}
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
            Network
          </Text>
          <Box display="flex" flexDirection="column" gap="18">
            {switchNetwork &&
              networkData.chains.map(x => {
                const activeChain = x.id === networkData.chain?.id;

                return (
                  <Box
                    as="button"
                    color="modalText"
                    disabled={activeChain}
                    fontFamily="body"
                    fontWeight={activeChain ? 'heavy' : undefined}
                    key={x.id}
                    onClick={
                      activeChain
                        ? undefined
                        : () => {
                            setIsSwitching(true);
                            switchNetwork(x.id);
                          }
                    }
                    type="button"
                  >
                    {x.name}
                  </Box>
                );
              })}
          </Box>
          {isSwitching ? (
            <Text color="modalText">Check your device...</Text>
          ) : null}
        </Box>
      </Dialog>
    </>
  );
}
