import React, { ReactNode, useMemo } from 'react'
import { Chain, chains, switchNetwork } from '@rainbow-me/kit-utils'
import { Web3Provider } from '@ethersproject/providers'
import { useState } from 'react'
import { Box } from '../Box'
import { IconStyles, IndicatorStyles, ListStyles, OptionStyles } from './style.css'

export interface NetworkSelectProps {
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

type ListProps = { isExpanded: boolean; className: string }

export interface ChainOptionProps {
  chain: Chain
  children?: ReactNode
  iconClassName?: string
}

export const ChainOption = ({
  chain,
  children,
  iconClassName,
  ...props
}: ChainOptionProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div aria-label="option" {...props} className={`${OptionStyles} ${props.className || ''}`}>
    <img
      aria-hidden="true"
      className={`${IconStyles} ${iconClassName}`}
      src={chain.logoURL || 'https://bafkreidyoljjm3jbmbewkxunvnn76s6cswo3d7ldhpnas54uphil23vlfu.ipfs.dweb.link/'}
    />{' '}
    {children}
  </div>
)

export const NetworkSelect = ({ chains: selectedChains, provider, classNames = {}, chainId }: NetworkSelectProps) => {
  const [isExpanded, setExpand] = useState(false)

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

  return (
    <Box
      position="relative"
      tabIndex={0}
      role="button"
      aria-label="select"
      aria-roledescription="Select a dapp network"
      className={classNames?.select}
    >
      {currentChain?.chainId && (
        <ChainOption
          aria-selected={true}
          chain={currentChain}
          className={`${classNames?.current}`}
          onClick={() => setExpand(!isExpanded)}
          iconClassName={classNames?.icon}
        />
      )}
      <div className={`${ListStyles} ${isExpanded ? '' : classNames?.hidden} ${classNames.list || ''}`}>
        {filteredChains.map((ch) => {
          const isCurrentChain = ch.chainId === currentChain?.chainId

          return (
            <ChainOption
              chain={ch}
              key={ch.name}
              onClick={() => {
                if (!isCurrentChain) switchNetwork(provider, ch)
              }}
              className={` ${classNames.option || ''}`}
              iconClassName={classNames?.icon || ''}
            >
              {ch.name} {isCurrentChain && <div className={IndicatorStyles} />}
            </ChainOption>
          )
        })}
      </div>
    </Box>
  )
}
