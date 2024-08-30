import React, { Fragment, useContext } from 'react';
import type { useSwitchChain } from 'wagmi';
import { isMobile } from '../../utils/isMobile';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import type { AsyncImageSrc } from '../AsyncImage/useAsyncImage';
import { Box, type BoxProps } from '../Box/Box';
import { MenuButton } from '../MenuButton/MenuButton';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { useRainbowKitChains } from '../RainbowKitProvider/RainbowKitChainContext';
import { Text } from '../Text/Text';

interface ChainProps {
  chainId: number;
  currentChainId: number;
  switchChain: ReturnType<typeof useSwitchChain>['switchChain'];
  chainIconSize: BoxProps['height'];
  name: string | undefined;
  isLoading: boolean;
  iconBackground: string | undefined;
  src: string | AsyncImageSrc | undefined | null;
  idx: number;
}

const Chain = ({
  chainId,
  currentChainId,
  switchChain,
  chainIconSize,
  isLoading,
  src,
  name,
  iconBackground,
  idx,
}: ChainProps) => {
  const mobile = isMobile();
  const { i18n } = useContext(I18nContext);
  const rainbowkitChains = useRainbowKitChains();

  const isCurrentChain = currentChainId === chainId;

  return (
    <Fragment>
      <MenuButton
        currentlySelected={isCurrentChain}
        onClick={isCurrentChain ? undefined : () => switchChain({ chainId })}
        testId={`chain-option-${chainId}`}
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
              {src && (
                <Box height="full" marginRight="8">
                  <AsyncImage
                    alt={name}
                    background={iconBackground}
                    borderRadius="full"
                    height={chainIconSize}
                    src={src}
                    width={chainIconSize}
                    testId={`chain-option-${chainId}-icon`}
                  />
                </Box>
              )}
              <div>{name ?? name}</div>
            </Box>
            {isCurrentChain && (
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                marginRight="6"
              >
                <Text color="accentColorForeground" size="14" weight="medium">
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
            {isLoading && (
              <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
                marginRight="6"
              >
                <Text color="modalText" size="14" weight="medium">
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
        <Box background="generalBorderDim" height="1" marginX="8" />
      )}
    </Fragment>
  );
};

export default Chain;
