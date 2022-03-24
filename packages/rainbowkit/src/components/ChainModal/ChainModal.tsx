import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { MenuButton } from '../MenuButton/MenuButton';
import { useRainbowKitChainsById } from '../RainbowKitProvider/RainbowKitChainContext';
import { Text } from '../Text/Text';

export interface ChainModalProps {
  activeChain: ReturnType<typeof useNetwork>['activeChain'];
  chains: ReturnType<typeof useNetwork>['chains'];
  open: boolean;
  onClose: () => void;
  onSwitchNetwork?: (chainId: number) => unknown;
}

export function ChainModal({
  activeChain,
  chains,
  onClose,
  onSwitchNetwork,
  open,
}: ChainModalProps) {
  const { data: accountData } = useAccount();
  const [switchingToChain, setSwitchingToChain] = useState<number | null>();
  const titleId = 'rk_chain_modal_title';
  const mobile = isMobile();
  const rainbowkitChainsById = useRainbowKitChainsById();

  useEffect(() => {
    if (!accountData?.connector) {
      return;
    }

    const stopSwitching = () => {
      setSwitchingToChain(null);
      onClose();
    };

    let provider: any;
    accountData?.connector?.getProvider?.().then(provider_ => {
      provider = provider_;
      provider.on('chainChanged', stopSwitching);
    });

    return () => {
      provider?.removeListener('chainChanged', stopSwitching);
    };
  }, [setSwitchingToChain, onClose, accountData?.connector]);

  if (!activeChain || !activeChain?.id) {
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
            {mobile && <div />}
            <Box paddingBottom="0" paddingLeft="10" paddingTop="4">
              <Text
                as="h1"
                color="modalText"
                id={titleId}
                size={mobile ? '20' : '18'}
                weight="heavy"
              >
                Switch Networks
              </Text>
            </Box>
            <CloseButton onClose={onClose} />
          </Box>
          <Box display="flex" flexDirection="column" gap="4" padding="2">
            {onSwitchNetwork &&
              chains.map((chain, idx) => {
                const isCurrentChain = chain.id === activeChain?.id;
                const switching = chain.id === switchingToChain;
                const chainIconUrl = rainbowkitChainsById[chain.id]?.iconUrl;

                return (
                  <>
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
                            height={mobile ? '36' : '28'}
                          >
                            {chainIconUrl ? (
                              <Box height="full" marginRight="8">
                                <img
                                  alt={chain.name}
                                  src={chainIconUrl}
                                  width={mobile ? '36' : '28'}
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
                              <Text
                                color="actionButtonText"
                                size="14"
                                weight="medium"
                              >
                                Connected
                              </Text>
                              <Box
                                background="connectionIndicator"
                                borderColor="selectedOptionBorder"
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
                              <Text color="modalText" size="14" weight="medium">
                                Confirm in Wallet
                              </Text>
                              <Box
                                background="standby"
                                borderColor="selectedOptionBorder"
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
                    {mobile && idx < chains?.length - 1 && (
                      <Box
                        background="generalBorderDim"
                        height="1"
                        marginX="8"
                      />
                    )}
                  </>
                );
              })}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
