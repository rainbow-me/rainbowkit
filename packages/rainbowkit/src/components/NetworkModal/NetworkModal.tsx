import React, { useEffect, useState } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';
import { Text } from '../Text/Text';

export interface NetworkModalProps {
  open: boolean;
  onClose: () => void;
}

export function NetworkModal({ onClose, open }: NetworkModalProps) {
  const [isSwitching, setIsSwitching] = useState(false);
  const [{ data: connectData }] = useConnect();
  const [{ data: networkData }, switchNetwork] = useNetwork();
  const titleId = 'rk_network_title';

  const chainIconUrlsById = useChainIconUrlsById();

  useEffect(() => {
    if (!connectData.connector) {
      return;
    }

    const stopSwitching = () => {
      setIsSwitching(false);
      onClose();
    };

    const provider = connectData.connector.getProvider();

    provider.on('chainChanged', stopSwitching);

    return () => {
      provider.removeListener('chainChanged', stopSwitching);
    };
  }, [connectData.connector, setIsSwitching, onClose]);

  if (!networkData || !networkData.chain) {
    return null;
  }

  return (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="24">
          <Text as="h1" color="modalText" id={titleId} size="23">
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
  );
}
