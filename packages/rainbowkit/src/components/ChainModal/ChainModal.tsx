import React, { useEffect, useState } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { MenuButton } from '../MenuButton/MenuButton';
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
  const [switchingToChain, setSwitchingToChain] = useState<number | null>();
  const [{ data: connectData }] = useConnect();
  const titleId = 'rk_chain_modal_title';

  const chainIconUrlsById = useChainIconUrlsById();

  useEffect(() => {
    if (!connectData.connector) {
      return;
    }

    const stopSwitching = () => {
      setSwitchingToChain(null);
      onClose();
    };

    const provider = connectData.connector.getProvider();

    provider.on('chainChanged', stopSwitching);

    return () => {
      provider.removeListener('chainChanged', stopSwitching);
    };
  }, [connectData.connector, setSwitchingToChain, onClose]);

  if (!networkData || !networkData.chain) {
    return null;
  }

  return (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile>
        <Box display="flex" flexDirection="column" gap="14">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box paddingBottom="0" paddingLeft="10" paddingTop="4">
              <Text
                as="h1"
                color="modalText"
                id={titleId}
                size="18"
                weight="heavy"
              >
                Switch networks
              </Text>
            </Box>
            <CloseButton onClose={onClose} />
          </Box>
          <Box display="flex" flexDirection="column" gap="4" padding="2">
            {onSwitchNetwork &&
              networkData.chains.map(chain => {
                const isCurrentChain = chain.id === networkData.chain?.id;
                const switching = chain.id === switchingToChain;
                const chainIconUrl = chainIconUrlsById[chain.id];

                return (
                  <MenuButton
                    currentlySelected={isCurrentChain}
                    key={chain.id}
                    onClick={
                      isCurrentChain
                        ? undefined
                        : () => {
                            setSwitchingToChain(chain.id);
                            onSwitchNetwork(chain.id);
                          }
                    }
                  >
                    <Box fontFamily="body" fontSize="16" fontWeight="bold">
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
                          height="28"
                        >
                          {chainIconUrl ? (
                            <Box height="full" marginRight="8">
                              <img
                                alt={chain.name}
                                src={chainIconUrl}
                                width="28"
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
                            marginRight="6"
                          >
                            <Text color="buttonText" size="14" weight="medium">
                              Connected
                            </Text>
                            <Box
                              background="connectionIndicator"
                              borderColor="buttonBorder"
                              borderRadius="full"
                              borderStyle="solid"
                              borderWidth="2"
                              height="8"
                              marginLeft="8"
                              width="8"
                            />
                          </Box>
                        )}
                        {switching && (
                          <Box
                            alignItems="center"
                            display="flex"
                            flexDirection="row"
                            marginRight="6"
                          >
                            <Text
                              color="modalTextSecondary"
                              size="14"
                              weight="medium"
                            >
                              Confirm in Wallet
                            </Text>
                            <Box
                              background="standby"
                              borderColor="buttonBorder"
                              borderRadius="full"
                              borderStyle="solid"
                              borderWidth="2"
                              height="8"
                              marginLeft="8"
                              width="8"
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
    </Dialog>
  );
}
