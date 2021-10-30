import React, { ReactNode, useMemo } from 'react'
import { Chain, chains, switchNetwork } from '@rainbow-me/kit-utils'
import { Web3Provider } from '@ethersproject/providers'
import { useState } from 'react'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'

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

const Select = styled.div`
  position: relative;
`

type ListProps = { isExpanded: boolean; className: string }

const List = styled.div<ListProps>`
  position: absolute;
  right: 0;
  min-width: 160px;
  width: max-content;
  display: ${(props) => (props.isExpanded ? 'block' : 'none')};
  background: linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%);
  backdrop-filter: blur(20px);
  z-index: 10;
  padding: 4px;
  border-radius: 16px;
  top: 42px;
  font-weight: 800;
`

const Option = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 12px;
  background: linear-gradient(179.83deg, rgba(26, 27, 31, 0.8) 0.15%, #1a1b1f 99.85%);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
`

export interface ChainOptionProps {
  chain: Chain
  children?: ReactNode
  iconClassName?: string
}

const Icon = styled.img`
  min-width: 24px;
  min-height: 24px;
`

const Indicator = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  right: 14px;
  top: calc(50% - 4px);
  border-radius: 50%;

  background: #2ccc00;
`

export const ChainOption = ({
  chain,
  children,
  iconClassName,
  ...props
}: ChainOptionProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <Option aria-label="option" {...props} className={props.className || ''}>
    <Icon
      aria-hidden="true"
      className={` ${iconClassName}`}
      src={chain.logoURL || 'https://bafkreidyoljjm3jbmbewkxunvnn76s6cswo3d7ldhpnas54uphil23vlfu.ipfs.dweb.link/'}
    />{' '}
    {children}
  </Option>
)

export const NetworkSelect = ({ chains: selectedChains, provider, classNames = {}, chainId }: NetworkSelectProps) => {
  const [isExpanded, setExpand] = useState(false)

  const currentChain = useMemo(() => chains.find((chain) => chain.chainId === chainId), [chainId])

  const filteredChains = useMemo(() => {
    const tmp = []

    for (const chain of selectedChains) {
      if (typeof chain === 'string') tmp.push(chains.find((x) => x.aliases.includes(chain)))
      else tmp.push(chain)
    }
    return tmp
  }, [selectedChains])

  return (
    <Select
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
          className={`${css`
            padding: 7px;

            /* Note: backdrop-filter has minimal browser support */
            border-radius: 16px;
          `} ${classNames?.current}`}
          onClick={() => setExpand(!isExpanded)}
          iconClassName={classNames?.icon}
        />
      )}
      <List isExpanded={isExpanded} className={`${isExpanded ? '' : classNames?.hidden} ${classNames.list || ''}`}>
        {filteredChains.map((ch) => {
          const isCurrentChain = ch.chainId === currentChain?.chainId

          return (
            <ChainOption
              chain={ch}
              key={ch.name}
              onClick={() => {
                if (!isCurrentChain) switchNetwork(provider, ch)
              }}
              className={`${css`
                padding: 10px;
                img {
                  margin-right: 6px;
                }
              `} ${
                isCurrentChain
                  ? css`
                      position: relative;
                      background: rgba(255, 255, 255, 0.06);
                    `
                  : ''
              } ${classNames.option || ''}`}
              iconClassName={classNames?.icon || ''}
            >
              {ch.name} {isCurrentChain && <Indicator />}
            </ChainOption>
          )
        })}
      </List>
    </Select>
  )
}
