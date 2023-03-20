import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box, BoxProps } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { DisconnectSqIcon } from '../Icons/DisconnectSq';
import { MenuButton } from '../MenuButton/MenuButton';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { useRainbowKitChainsById } from '../RainbowKitProvider/RainbowKitChainContext';
import { Text } from '../Text/Text';
export interface ChainModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChainModal({ onClose, open }: ChainModalProps) {
  const { chain: activeChain } = useNetwork();
  const { chains, error: networkError, switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { connector: activeConnector } = useAccount();
  const [switchingToChain, setSwitchingToChain] = useState<number | null>();
  const titleId = 'rk_chain_modal_title';
  const mobile = isMobile();
  const rainbowkitChainsById = useRainbowKitChainsById();
  const unsupportedChain = activeChain?.unsupported ?? false;
  const chainIconSize = mobile ? '36' : '28';

  const stopSwitching = useCallback(() => {
    setSwitchingToChain(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!activeConnector) {
      return;
    }

    const stopSwitching = () => {
      setSwitchingToChain(null);
      onClose();
    };

    let provider: any;
    activeConnector?.getProvider?.().then((provider_: any) => {
      provider = provider_;
      provider.on('chainChanged', stopSwitching);
    });

    return () => {
      provider?.removeListener('chainChanged', stopSwitching);
    };
  }, [activeConnector, onClose, stopSwitching]);

  useEffect(() => {
    if (networkError && networkError.name === 'UserRejectedRequestError') {
      stopSwitching();
    }
  }, [networkError, stopSwitching]);

  const { appName } = useContext(AppContext);

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
            {mobile && <Box width="30" />}
            <Box paddingBottom="0" paddingLeft="8" paddingTop="4">
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
          {unsupportedChain && (
            <Box marginX="8" textAlign={mobile ? 'center' : 'left'}>
              <Text color="modalTextSecondary" size="14" weight="medium">
                Wrong network detected, switch or disconnect to continue.
              </Text>
            </Box>
          )}
          <Box display="flex" flexDirection="column" gap="4" padding="2">
            {switchNetwork ? (
              chains.map((chain, idx) => {
                const isCurrentChain = chain.id === activeChain?.id;
                const switching = chain.id === switchingToChain;
                const rainbowKitChain = rainbowkitChainsById[chain.id];
                const chainIconSize: BoxProps['width'] = mobile ? '36' : '28';
                const chainIconUrl = rainbowKitChain?.iconUrl;
                const chainIconBackground = rainbowKitChain?.iconBackground;

                return (
                  <Fragment key={chain.id}>
                    <MenuButton
                      currentlySelected={isCurrentChain}
                      onClick={
                        isCurrentChain
                          ? undefined
                          : () => {
                              setSwitchingToChain(chain.id);
                              switchNetwork(chain.id);
                            }
                      }
                      testId={`chain-option-${chain.id}`}
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
                            height={chainIconSize}
                          >
                            {chainIconUrl ? (
                              <Box height="full" marginRight="8">
                                <AsyncImage
                                  alt={chain.name}
                                  background={chainIconBackground}
                                  borderRadius="full"
                                  height={chainIconSize}
                                  src={chainIconUrl}
                                  width={chainIconSize}
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
                                color="accentColorForeground"
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
                                borderWidth="1"
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
                                borderRadius="full"
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
                  </Fragment>
                );
              })
            ) : (
              <Box
                background="generalBorder"
                borderRadius="menuButton"
                paddingX="18"
                paddingY="12"
              >
                <Text color="modalText" size="14" weight="medium">
                  Your wallet does not support switching networks from{' '}
                  {appName ?? 'this app'}. Try switching networks from within
                  your wallet instead.
                </Text>
              </Box>
            )}
            {unsupportedChain && (
              <>
                <Box background="generalBorderDim" height="1" marginX="8" />
                <MenuButton
                  onClick={() => disconnect()}
                  testId="chain-option-disconnect"
                >
                  <Box
                    color="error"
                    fontFamily="body"
                    fontSize="16"
                    fontWeight="bold"
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
                        height={chainIconSize}
                      >
                        <Box
                          alignItems="center"
                          color="error"
                          height={chainIconSize}
                          justifyContent="center"
                          marginRight="8"
                        >
                          <DisconnectSqIcon size={Number(chainIconSize)} />
                        </Box>
                        <div>Disconnect</div>
                      </Box>
                    </Box>
                  </Box>
                </MenuButton>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
