import React, { useEffect, useState } from 'react';
import { useConnect, useNetwork } from 'wagmi';
import { Box } from '../Box/Box';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { DropdownIcon } from '../Icons/Dropdown';
import { MenuButton } from '../MenuButton/MenuButton';
import { useChainIconUrlsById } from '../RainbowKitProvider/ChainIconsContext';
import { Text } from '../Text/Text';
import { NetworkClassName, SelectedMarkClassName } from './Network.css';

export function Network() {
  const [open, setOpen] = useState(false);
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
          background={
            networkData.chain.unsupported
              ? 'connectButtonBackgroundError'
              : 'connectButtonBackground'
          }
          borderRadius="connectButton"
          boxShadow="connectButton"
          className={NetworkClassName}
          color={
            networkData.chain.unsupported
              ? 'connectButtonTextError'
              : 'connectButtonText'
          }
          display="flex"
          fontFamily="body"
          fontWeight="bold"
          onClick={() => setOpen(true)}
          paddingX="10"
          paddingY="8"
          type="button"
        >
          {networkData.chain?.unsupported ? (
            <Box>Invalid network</Box>
          ) : (
            <Box alignItems="center" display="flex" gap="4">
              {currentChainIconUrl ? (
                <img
                  alt={networkData.chain.name ?? 'Chain icon'}
                  height="24"
                  src={currentChainIconUrl}
                  width="24"
                />
              ) : null}
              <div>{networkData.chain.name ?? networkData.chain.id}</div>
            </Box>
          )}
          <DropdownIcon />
        </Box>
      </div>

      <Dialog onClose={() => setOpen(false)} open={open} titleId={titleId}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap="14">
            <Box padding="14" paddingBottom="0">
              <Text
                as="h1"
                color="modalText"
                id={titleId}
                size="23"
                weight="heavy"
              >
                Select Network
              </Text>
            </Box>
            <Box display="flex" flexDirection="column" gap="10">
              {switchNetwork &&
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
                              switchNetwork(chain.id);
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
                              borderRadius="full"
                              className={SelectedMarkClassName}
                              height="12"
                              marginRight="4"
                              width="12"
                            />
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
    </>
  );
}
