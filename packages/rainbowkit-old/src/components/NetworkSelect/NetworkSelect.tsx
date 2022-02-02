import { UnsupportedChainIdError } from '@web3-react/core';
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { useToggle } from '../../hooks/useToggle';
import { useWeb3State } from '../../hooks/useWeb3State';
import { Chain, chains } from '../../utils/chains';
import { switchNetwork } from '../../utils/network';
import { Box, BoxProps } from '../Box/Box';
import { Text } from '../Text/Text';
import { ChainOption } from './ChainOption';
import {
  ButtonStyles,
  CurrentChainOptionStyles,
  IndicatorStyles,
  ListStyles,
  SelectOptionStyles,
} from './NetworkSelect.css';

export interface NetworkSelectProps extends Omit<BoxProps, 'className'> {
  chains: (string | Chain)[];
  classNames?: Partial<{
    select: string;
    option: string;
    hidden: string;
    current: string;
    list: string;
    icon: string;
    wrongNetwork: string;
  }>;
}

export const NetworkSelect = ({
  chains: selectedChains,

  classNames = {},
  ...props
}: NetworkSelectProps) => {
  const [open, toggle] = useToggle(false);

  const { chainId, error, provider } = useWeb3State();

  const currentChain = useMemo(
    () => chains.find(chain => chain.chainId === chainId),
    [chainId]
  );

  const filteredChains = useMemo(() => {
    const tmp: Chain[] = [];

    for (const chain of selectedChains) {
      if (typeof chain === 'string') {
        const chainObj = chains.find(x => x.aliases.includes(chain));
        if (chainObj) tmp.push(chainObj);
      } else tmp.push(chain);
    }
    return tmp;
  }, [selectedChains]);

  const node = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(node, open ? toggle : undefined);

  return (
    <Box
      aria-label="select"
      aria-roledescription="Select a dapp network"
      className={clsx(classNames.select)}
      position="relative"
      ref={node}
      role="button"
      tabIndex={0}
      width="max"
      {...props}
    >
      {error instanceof UnsupportedChainIdError ? (
        <Box
          alignItems="center"
          aria-label="option"
          background="dropdownButtonBackground"
          borderRadius="dropdownButton"
          boxShadow="dropdownButton"
          className={clsx(ButtonStyles, classNames.wrongNetwork)}
          color="menuText"
          cursor="pointer"
          display="flex"
          flexDirection="row"
          fontFamily="body"
          fontWeight="heavy"
          padding="8"
          position="relative"
        >
          Wrong network ⚠️
        </Box>
      ) : (
        currentChain?.chainId && (
          <ChainOption
            aria-selected
            borderRadius="networkButton"
            boxShadow="dropdownButton"
            chain={currentChain}
            className={clsx(ButtonStyles, classNames.current)}
            iconClassName={clsx(classNames.icon)}
            onClick={toggle}
            padding="6"
          />
        )
      )}
      <Box
        background="menuBackground"
        borderRadius="menu"
        boxShadow="menu"
        className={[ListStyles, classNames.list]}
        display={open ? 'block' : 'none'}
        fontWeight="heavy"
        padding="4"
        position="absolute"
        right="0"
        width="max"
      >
        {filteredChains.map(ch => {
          const isCurrentChain = ch.chainId === currentChain?.chainId;

          return (
            <ChainOption
              chain={ch}
              className={clsx([
                SelectOptionStyles,
                { [CurrentChainOptionStyles]: isCurrentChain },
                classNames.option,
              ])}
              iconClassName={classNames?.icon || ''}
              key={ch.name}
              onClick={() => {
                // @ts-expect-error provider could be undefined?
                if (!isCurrentChain) switchNetwork(provider, ch);
              }}
            >
              <Text color="dropdownButtonText" weight="bold">
                {ch.name}
              </Text>
              {isCurrentChain && (
                <Box
                  background="connectionIndicator"
                  borderRadius="full"
                  className={IndicatorStyles}
                  height="8"
                  marginRight="14"
                  position="absolute"
                  right="0"
                  width="8"
                />
              )}
            </ChainOption>
          );
        })}
      </Box>
    </Box>
  );
};
