import React, { useContext, useState } from 'react';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { useConfig } from 'wagmi';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { DisconnectSqIcon } from '../Icons/DisconnectSq';
import { MenuButton } from '../MenuButton/MenuButton';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { useRainbowKitChains } from '../RainbowKitProvider/RainbowKitChainContext';
import { Text } from '../Text/Text';
import Chain from './Chain';
import {
  DesktopScrollClassName,
  MobileScrollClassName,
} from './ChainModal.css';

export interface ChainModalProps {
  open: boolean;
  onClose: () => void;
  nonce?: string;
}

export function ChainModal({ onClose, open, nonce }: ChainModalProps) {
  const { chainId } = useAccount();
  const { chains } = useConfig();
  const [pendingChainId, setPendingChainId] = useState<number | null>(null);
  const { switchChain } = useSwitchChain({
    mutation: {
      onMutate: ({ chainId: _chainId }) => {
        setPendingChainId(_chainId);
      },
      onSuccess: () => {
        if (pendingChainId) setPendingChainId(null);
      },
      onError: () => {
        if (pendingChainId) setPendingChainId(null);
      },
      onSettled: () => {
        onClose();
      },
    },
  });

  const { i18n } = useContext(I18nContext);

  const { disconnect } = useDisconnect();
  const titleId = 'rk_chain_modal_title';
  const mobile = isMobile();
  const isCurrentChainSupported = chains.some((chain) => chain.id === chainId);
  const chainIconSize = mobile ? '36' : '28';
  const rainbowkitChains = useRainbowKitChains();

  if (!chainId) {
    return null;
  }

  return (
    <Dialog onClose={onClose} open={open} titleId={titleId} nonce={nonce}>
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
          {!isCurrentChainSupported && (
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
            {rainbowkitChains.map(
              ({ iconBackground, iconUrl, id, name }, idx) => {
                return (
                  <Chain
                    key={id}
                    chainId={id}
                    currentChainId={chainId}
                    switchChain={switchChain}
                    chainIconSize={chainIconSize}
                    isLoading={pendingChainId === id}
                    src={iconUrl}
                    name={name}
                    iconBackground={iconBackground}
                    idx={idx}
                  />
                );
              },
            )}
            {!isCurrentChainSupported && (
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
