import React, { Fragment, useContext } from 'react';
import { useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { DisconnectSqIcon } from '../Icons/DisconnectSq';
import { MenuButton } from '../MenuButton/MenuButton';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { useRainbowKitChains } from '../RainbowKitProvider/RainbowKitChainContext';
import { Text } from '../Text/Text';
import {
  DesktopScrollClassName,
  MobileScrollClassName,
} from './ChainModal.css';

export interface ChainModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChainModal({ onClose, open }: ChainModalProps) {
  const { chain: activeChain } = useNetwork();
  const { chains, pendingChainId, reset, switchNetwork } = useSwitchNetwork({
    onSettled: () => {
      reset(); // reset mutation variables (eg. pendingChainId, error)
      onClose();
    },
  });

  const i18n = useContext(I18nContext);

  const { disconnect } = useDisconnect();
  const titleId = 'rk_chain_modal_title';
  const mobile = isMobile();
  const unsupportedChain = activeChain?.unsupported ?? false;
  const chainIconSize = mobile ? '36' : '28';

  const { appName } = useContext(AppContext);

  const rainbowkitChains = useRainbowKitChains();

  if (!activeChain || !activeChain?.id) {
    return null;
  }

  return (
    <Dialog onClose={onClose} open={open} titleId={titleId}>
      <DialogContent bottomSheetOnMobile paddingBottom="0">
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
                {i18n.t('chains.title')}
              </Text>
            </Box>
            <CloseButton onClose={onClose} />
          </Box>
          {unsupportedChain && (
            <Box marginX="8" textAlign={mobile ? 'center' : 'left'}>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {i18n.t('chains.wrong_network')}
              </Text>
            </Box>
          )}
          <Box
            className={mobile ? MobileScrollClassName : DesktopScrollClassName}
            display="flex"
            flexDirection="column"
            gap="4"
            padding="2"
            paddingBottom="16"
          >
            {switchNetwork ? (
              rainbowkitChains.map(
                ({ iconBackground, iconUrl, id, name }, idx) => {
                  const chain = chains.find((c) => c.id === id);
                  if (!chain) return null;

                  const isCurrentChain = chain.id === activeChain?.id;
                  const switching =
                    !isCurrentChain && chain.id === pendingChainId;

                  return (
                    <Fragment key={chain.id}>
                      <MenuButton
                        currentlySelected={isCurrentChain}
                        onClick={
                          isCurrentChain
                            ? undefined
                            : () => switchNetwork(chain.id)
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
                              {iconUrl && (
                                <Box height="full" marginRight="8">
                                  <AsyncImage
                                    alt={name ?? chain.name}
                                    background={iconBackground}
                                    borderRadius="full"
                                    height={chainIconSize}
                                    src={iconUrl}
                                    width={chainIconSize}
                                    testId={`chain-option-${chain.id}-icon`}
                                  />
                                </Box>
                              )}
                              <div>{name ?? chain.name}</div>
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
                                  {i18n.t('chains.connected')}
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
                                <Text
                                  color="modalText"
                                  size="14"
                                  weight="medium"
                                >
                                  {i18n.t('chains.confirm')}
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
                      {mobile && idx < rainbowkitChains.length - 1 && (
                        <Box
                          background="generalBorderDim"
                          height="1"
                          marginX="8"
                        />
                      )}
                    </Fragment>
                  );
                },
              )
            ) : (
              <Box
                background="generalBorder"
                borderRadius="menuButton"
                paddingX="18"
                paddingY="12"
              >
                <Text color="modalText" size="14" weight="medium">
                  {appName
                    ? i18n.t('chains.switching_not_supported', {
                        appName,
                      })
                    : i18n.t('chains.switching_not_supported_fallback')}
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
                        <div>{i18n.t('chains.disconnect')}</div>
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
