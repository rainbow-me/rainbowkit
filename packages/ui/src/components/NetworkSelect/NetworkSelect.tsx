import React, { useMemo, useRef } from 'react'
import { Chain, chains, switchNetwork } from '@rainbow-me/kit-utils'
import { Box, BoxProps } from '../Box'
import {
  ButtonStyles,
  IndicatorStyles,
  ListStyles,
  SelectOptionStyles,
  CurrentChainOptionStyles
} from './NetworkSelect.css'
import { ChainOption } from './ChainOption'
import { Text } from '../Text'
import clsx from 'clsx'
import { useToggle, useOnClickOutside, useWeb3State } from '@rainbow-me/kit-hooks'

export interface NetworkSelectProps extends Omit<BoxProps, 'className'> {
  chains: (string | Chain)[]
  classNames?: Partial<{
    select: string
    option: string
    hidden: string
    current: string
    list: string
    icon: string
  }>
}

export const NetworkSelect = ({
  chains: selectedChains,

  classNames = {},
  ...props
}: NetworkSelectProps) => {
  const [open, toggle] = useToggle(false)

  const { provider, chainId, error } = useWeb3State()

  const isUnsupportedChain = useMemo(() => {
    return error instanceof Error && error.name === 'UnsupportedChainIdError'
  }, [error])

  const currentChain = useMemo(() => chains.find((chain) => chain.chainId === chainId) || chains[0], [chainId])

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
      <ChainOption
        aria-selected={true}
        chain={currentChain}
        className={clsx(ButtonStyles, classNames.current)}
        onClick={toggle}
        iconClassName={clsx(classNames.icon)}
        padding="6"
        borderRadius="networkButton"
      />
      <Box
        background="menuBackground"
        right="0"
        position="absolute"
        width="max"
        padding="4"
        borderRadius="menu"
        fontWeight="heavy"
        display={open ? 'block' : 'none'}
        cursor={isUnsupportedChain ? 'not-allowed' : 'pointer'}
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
              className={clsx([
                SelectOptionStyles,
                { [CurrentChainOptionStyles]: isCurrentChain && !isUnsupportedChain },
                classNames.option
              ])}
              iconClassName={classNames?.icon || ''}
            >
              <Text color="dropdownButtonText" weight="bold">
                {ch.name}
              </Text>
              {isCurrentChain && !isUnsupportedChain && (
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
