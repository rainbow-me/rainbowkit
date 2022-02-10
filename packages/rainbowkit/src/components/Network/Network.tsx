import React, { useEffect, useRef, useState } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { DropdownIcon } from '../Icons/Dropdown';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';
import { Text } from '../Text/Text';

export function Network() {
  const [open, setOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [{ data: connectData }] = useConnect();
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const initialFocusRef = useRef<HTMLHeadingElement | null>(null);
  const titleId = 'rk_network_title';

  const chainIconUrlsById = useChainIconUrlsById();

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
      provider.removeListener('chainChanged', stopSwitching);
    };
  }, [connectData.connector, setIsSwitching]);

  if (!networkData || !networkData.chain) {
    return null;
  }

  const currentChainIconUrl = chainIconUrlsById[networkData.chain.id];

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
          padding="10"
          type="button"
        >
          <Box alignItems="center" display="flex" gap="4">
            {currentChainIconUrl ? (
              <img
                alt={networkData.chain.name ?? 'Chain icon'}
                height="16"
                src={currentChainIconUrl}
                width="16"
              />
            ) : null}
            <div>
              {networkData.chain.name ?? networkData.chain.id}{' '}
              {networkData.chain?.unsupported && '(unsupported)'}
            </div>
          </Box>
          {networkData.chain?.unsupported && '(unsupported)'}
          <DropdownIcon />
        </Box>
      </div>

      <Dialog
        initialFocusRef={initialFocusRef}
        onClose={() => setOpen(false)}
        open={open}
        titleId={titleId}
      >
        <DialogContent>
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
                networkData.chains.map(chain => {
                  const isCurrentChain = chain.id === networkData.chain?.id;
                  const chainIconUrl = chainIconUrlsById[chain.id];

                  return (
                    <Box
                      as="button"
                      color="modalText"
                      disabled={isCurrentChain}
                      fontFamily="body"
                      fontWeight={isCurrentChain ? 'heavy' : undefined}
                      key={chain.id}
                      onClick={
                        isCurrentChain
                          ? undefined
                          : () => {
                              setIsSwitching(true);
                              switchNetwork(chain.id);
                            }
                      }
                      type="button"
                    >
                      <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        gap="6"
                      >
                        {chainIconUrl ? (
                          <img
                            alt={chain.name}
                            height="24"
                            src={chainIconUrl}
                            width="24"
                          />
                        ) : null}
                        <div>{chain.name}</div>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
            {isSwitching ? (
              <Text color="modalText">Check your device...</Text>
            ) : null}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
