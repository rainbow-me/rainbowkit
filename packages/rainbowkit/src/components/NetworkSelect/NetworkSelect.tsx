import React, { useMemo, useRef } from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import clsx from 'clsx'
import { Chain, chains } from '../../utils/chains'
import { switchNetwork } from '../../utils/network'
import { useWeb3State } from '../../hooks/useWeb3State'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useToggle } from '../../hooks/useToggle'
import { Box, BoxProps } from '../Box/Box'
import {
  ButtonStyles,
  IndicatorStyles,
  ListStyles,
  SelectOptionStyles,
  CurrentChainOptionStyles
} from './NetworkSelect.css'
import { ChainOption } from './ChainOption'
import { Text } from '../Text/Text'

export interface NetworkSelectProps extends Omit<BoxProps, 'className'> {
  chains: (string | Chain)[]
  classNames?: Partial<{
    select: string
    option: string
    hidden: string
    current: string
    list: string
    icon: string
    wrongNetwork: string
  }>
}

export const NetworkSelect = ({
  chains: selectedChains,

  classNames = {},
  ...props
}: NetworkSelectProps) => {
  const [open, toggle] = useToggle(false)

  const { error, provider, chainId } = useWeb3State()

  const currentChain = useMemo(() => chains.find((chain) => chain.chainId === chainId), [chainId])

  const filteredChains = useMemo(() => {
    const tmp: Chain[] = []

    for (const chain of selectedChains) {
      if (typeof chain === 'string') {
        const chainObj = chains.find((x) => x.aliases.includes(chain))
        if (chainObj) tmp.push(chainObj)
      } else tmp.push(chain)
    }
    return tmp
  }, [selectedChains])

  const node = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <Box
      width="max"
      position="relative"
      tabIndex={0}
      role="button"
      ref={node}
      aria-label="select"
      aria-roledescription="Select a dapp network"
      className={clsx(classNames.select)}
      {...props}
    >
      {error instanceof UnsupportedChainIdError ? (
        <Box
          display="flex"
          position="relative"
          cursor="pointer"
          alignItems="center"
          flexDirection="row"
          padding="8"
          fontFamily="body"
          color="menuText"
          borderRadius="dropdownButton"
          boxShadow="dropdownButton"
          fontWeight="heavy"
          background="dropdownButtonBackground"
          aria-label="option"
          className={clsx(ButtonStyles, classNames.wrongNetwork)}
        >
          Wrong network ⚠️
        </Box>
      ) : (
        currentChain?.chainId && (
          <ChainOption
            aria-selected={true}
            chain={currentChain}
            className={clsx(ButtonStyles, classNames.current)}
            onClick={toggle}
            iconClassName={clsx(classNames.icon)}
            padding="6"
            borderRadius="networkButton"
            boxShadow="dropdownButton"
          />
        )
      )}
      <Box
        background="menuBackground"
        boxShadow="menu"
        right="0"
        position="absolute"
        width="max"
        padding="4"
        borderRadius="menu"
        fontWeight="heavy"
        display={open ? 'block' : 'none'}
        className={[ListStyles, classNames.list]}
      >
        {filteredChains.map((ch) => {
          const isCurrentChain = ch.chainId === currentChain?.chainId

          return (
            <ChainOption
              chain={ch}
              key={ch.name}
              onClick={() => {
                // @ts-expect-error provider could be undefined?
                if (!isCurrentChain) switchNetwork(provider, ch)
              }}
              className={clsx([SelectOptionStyles, { [CurrentChainOptionStyles]: isCurrentChain }, classNames.option])}
              iconClassName={classNames?.icon || ''}
            >
              <Text color="dropdownButtonText" weight="bold">
                {ch.name}
              </Text>
              {isCurrentChain && (
                <Box
                  position="absolute"
                  width="8"
                  height="8"
                  right="0"
                  marginRight="14"
                  borderRadius="full"
                  background="connectionIndicator"
                  className={IndicatorStyles}
                />
              )}
            </ChainOption>
          )
        })}
      </Box>
    </Box>
  )
}
