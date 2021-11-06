import React, { ReactNode, useMemo } from 'react'
import { Chain, chains, switchNetwork } from '@rainbow-me/kit-utils'
import { Web3Provider } from '@ethersproject/providers'
import { useState } from 'react'
import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { useTheme } from '@rainbow-me/kit-theming'

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

export interface ChainOptionProps {
  chain: Chain
  children?: ReactNode
  iconClassName?: string
  $foreground?: string
}

type ListProps = { $isExpanded: boolean; className: string; $background: string }

const Select = styled.div`
  position: relative;
`

const List = styled.div<ListProps>`
  position: absolute;
  right: 0;
  min-width: 160px;
  width: max-content;
  display: ${(props) => (props.$isExpanded ? 'block' : 'none')};
  z-index: 10;
  padding: 4px;
  top: 42px;
`

const Option = styled.div<{ $foreground: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  color: ${({ $foreground }) => $foreground};
`

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
`

export const ChainOption = ({
  chain,
  children,
  iconClassName,
  $foreground,
  ...props
}: ChainOptionProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <Option aria-label="option" {...props} $foreground={$foreground} className={props.className || ''}>
    <Icon
      aria-hidden="true"
      className={` ${iconClassName}`}
      src={chain.logoURL || 'https://bafkreidyoljjm3jbmbewkxunvnn76s6cswo3d7ldhpnas54uphil23vlfu.ipfs.dweb.link'}
    />{' '}
    {children}
  </Option>
)

export const NetworkSelect = ({ chains: selectedChains, provider, classNames = {}, chainId }: NetworkSelectProps) => {
  const {
    components: {
      NetworkSelect: { current, active, option, indicator, list }
    },
    foreground,
    background
  } = useTheme()

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
          $foreground={foreground}
          className={`${css`
            padding: 7px;
          `} ${option} ${current} ${classNames?.current}`}
          onClick={() => setExpand(!isExpanded)}
          iconClassName={classNames?.icon}
        />
      )}
      <List
        $background={background}
        $isExpanded={isExpanded}
        className={`${list} ${isExpanded ? '' : classNames?.hidden} ${classNames?.list || ''}`}
      >
        {filteredChains.map((ch) => {
          const isActiveChain = ch.chainId === currentChain?.chainId

          return (
            <ChainOption
              chain={ch}
              key={ch.name}
              onClick={() => {
                if (!isActiveChain) switchNetwork(provider, ch)
              }}
              $foreground={foreground}
              className={`${css`
                padding: 10px;
                img {
                  margin-right: 6px;
                }
              `} ${option} ${
                isActiveChain
                  ? `${css`
                      position: relative;
                    `} ${active}`
                  : ''
              } ${classNames.option || ''}`}
              iconClassName={classNames?.icon || ''}
            >
              {ch.name} {isActiveChain && <Indicator className={indicator} />}
            </ChainOption>
          )
        })}
      </List>
    </Select>
  )
}
