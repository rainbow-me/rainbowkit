import React, { useMemo, useRef } from 'react'
import { Chain, chains, switchNetwork } from '@rainbow-me/kit-utils'
import { Web3Provider } from '@ethersproject/providers'
import { Box, BoxProps } from '../Box'
import { ButtonStyles, IndicatorStyles, ListStyles, SelectOptionStyles } from './NetworkSelect.css'
import { ChainOption } from './ChainOption'
import clsx from 'clsx'
import { useToggle, useOnClickOutside, useWeb3State } from '@rainbow-me/kit-hooks'
import { UnsupportedChainIdError } from '@web3-react/core'

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

  const node = useRef<HTMLDivElement>()
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
          color="foreground"
          borderRadius="16"
          fontWeight="heavy"
          background="background"
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
            className={cslx(ButtonStyles, classNames.current)}
            onClick={toggle}
            iconClassName={clsx(classNames.icon)}
            padding="6"
          />
        )
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
function cslx(ButtonStyles: string, current: string): string {
  throw new Error('Function not implemented.')
}
