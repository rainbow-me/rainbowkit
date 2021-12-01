import React, { useMemo, useRef } from 'react'
import { Chain, chains, switchNetwork } from '@rainbow-me/kit-utils'
import { Web3Provider } from '@ethersproject/providers'
import { Box, BoxProps } from '../Box'
import { ButtonStyles, IndicatorStyles, ListStyles, SelectOptionStyles } from './NetworkSelect.css'
import { ChainOption } from './ChainOption'
import clsx from 'clsx'
import { useToggle, useOnClickOutside } from '@rainbow-me/kit-hooks'

export interface NetworkSelectProps extends Omit<BoxProps, 'className'> {
  chains: (string | Chain)[]
  provider: Web3Provider
  chainId: number
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
  provider,
  classNames = {},
  chainId,
  ...props
}: NetworkSelectProps) => {
  const [open, toggle] = useToggle(false)

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

  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <Box
      position="relative"
      tabIndex={0}
      role="button"
      ref={node}
      aria-label="select"
      aria-roledescription="Select a dapp network"
      className={clsx(classNames.select)}
      {...props}
    >
      {currentChain?.chainId && (
        <ChainOption
          aria-selected={true}
          chain={currentChain}
          className={`${ButtonStyles} ${classNames?.current}`}
          onClick={toggle}
          iconClassName={classNames?.icon || ''}
          padding="6"
        />
      )}
      <Box
        background="background"
        right="0"
        position="absolute"
        width="max"
        padding="4"
        borderRadius="16"
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
                if (!isCurrentChain) switchNetwork(provider, ch)
              }}
              className={clsx([SelectOptionStyles, { CurrentChainOptionStyles: isCurrentChain }, classNames.option])}
              iconClassName={classNames?.icon || ''}
            >
              {ch.name}{' '}
              {isCurrentChain && (
                <Box
                  position="absolute"
                  width="8"
                  height="8"
                  right="14"
                  borderRadius="full"
                  background="green"
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
