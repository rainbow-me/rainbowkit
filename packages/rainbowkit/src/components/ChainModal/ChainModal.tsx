import React, { useEffect, useState } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { CloseIcon } from '../Icons/Close';
import { MenuButton } from '../MenuButton/MenuButton';
import { CloseButtonClassName } from '../ProfileDetails/ProfileDetails.css';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';
import { Text } from '../Text/Text';

export interface ChainModalProps {
  open: boolean;
  onClose: () => void;
  networkData: ReturnType<typeof useNetwork>[0]['data'];
  onSwitchNetwork?: (chainId: number) => unknown;
}

export function ChainModal({
  networkData,
  onClose,
  onSwitchNetwork,
  open,
}: ChainModalProps) {
  const [isSwitching, setIsSwitching] = useState(false);
  const [{ data: connectData }] = useConnect();
  const titleId = 'rk_chain_modal_title';

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
        <Box display="flex" flexDirection="column" gap="14">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding="14"
          >
            <Box paddingBottom="0">
              <Text
                as="h1"
                color="modalText"
                id={titleId}
                size="23"
                weight="heavy"
              >
                Choose a network
              </Text>
              <Box marginTop="4">
                <Text
                  as="h1"
                  color="modalTextSecondary"
                  id={titleId}
                  size="16"
                  weight="bold"
                >
                  Choose your preferred network
                </Text>
              </Box>
            </Box>
            <Box
              as="button"
              borderRadius="full"
              className={CloseButtonClassName}
              height="34"
              onClick={onClose}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="10">
            {onSwitchNetwork &&
              networkData.chains.map(chain => {
                const isCurrentChain = chain.id === networkData.chain?.id;
                const chainIconUrl = chainIconUrlsById[chain.id];

                return (
                  <MenuButton
                    currentlySelected={isCurrentChain}
                    key={chain.id}
                    onClick={
                      isCurrentChain
                        ? undefined
                        : () => {
                            setIsSwitching(chain.id);
                            onSwitchNetwork(chain.id);
                          }
                    }
                  >
                    <Box
                      color="modalText"
                      fontFamily="body"
                      fontSize="18"
                      fontWeight={isCurrentChain ? 'heavy' : 'bold'}
                    >
                      <Box
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Box
                          alignItems="center"
                          display="flex"
                          flexDirection="row"
                          gap="4"
                          height="24"
                        >
                          {chainIconUrl ? (
                            <Box height="full" marginRight="8">
                              <img
                                alt={chain.name}
                                src={chainIconUrl}
                                width="24"
                              />
                            </Box>
                          ) : null}
                          <div>{chain.name}</div>
                        </Box>
                        {isCurrentChain && (
                          <Box
                            alignItems="center"
                            display="flex"
                            flexDirection="row"
                          >
                            <Text
                              color="connectionIndicator"
                              size="16"
                              weight="heavy"
                            >
                              Connected
                            </Text>
                            <Box
                              background="connectionIndicator"
                              borderRadius="full"
                              height="12"
                              marginLeft="8"
                              width="12"
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </MenuButton>
                );
              })}
          </Box>
        </Box>
      </DialogContent>
      {isSwitching && (
        <DialogContent marginTop="14">
          <Box padding="10">
            <Text color="modalText" font="body" size="18" weight="bold">
              Confirm in your wallet...
            </Text>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
}
