import React, { ReactNode, useMemo } from 'react'
import { Chain, chains, switchNetwork } from '@rainbowkit/utils'
import { useChainId } from '@rainbowkit/hooks'
import styles from '../../styles/NetworkSelect.module.css'
import { Web3Provider } from '@ethersproject/providers'
import { useState } from 'react'

export interface NetworkSelectProps {
  chains: string[]
  provider: Web3Provider
  classNames?: Partial<{
    select: string
    option: string
    hidden: string
    current: string
    list: string
  }>
}

function hasSubArray(master: string[], sub: string[]) {
  return sub.some(
    (
      (i) => (v: string) =>
        (i = master.indexOf(v, i) + 1)
    )(0)
  )
}

const findInSubArray = (master: string[], sub: string[]) => {
  return master.indexOf(master.find((x) => sub.includes(x)))
}

export interface ChainOptionProps {
  chain: Chain
  children?: ReactNode
}

export const ChainOption = ({
  chain,
  children,
  ...props
}: ChainOptionProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <div aria-label="option" {...props} className={`${styles.option} ${props.className}`}>
    <img
      aria-hidden="true"
      height={32}
      width={32}
      src={chain.logoURL || 'https://bafkreidyoljjm3jbmbewkxunvnn76s6cswo3d7ldhpnas54uphil23vlfu.ipfs.dweb.link/'}
    />{' '}
    {chain.name} {children}
  </div>
)

export const NetworkSelect = ({ chains: chainNames, provider, classNames = {} }: NetworkSelectProps) => {
  const currentChainId = useChainId({ initialChainId: 1, provider })

  const [isExpanded, setExpand] = useState(false)

  const currentChain = useMemo(() => chains.find((chain) => chain.chainId === currentChainId), [currentChainId])

  const filteredChains = useMemo(
    () =>
      chains
        .filter((chain) => hasSubArray(chainNames, chain.aliases))
        // to sort the same way as given in props
        .sort((a, b) => findInSubArray(chainNames, a.aliases) - findInSubArray(chainNames, b.aliases)),
    [chainNames]
  )

  return (
    <div
      tabIndex={0}
      role="button"
      aria-label="select"
      aria-roledescription="Select a dapp network"
      className={`${styles.select} ${classNames.select}`}
    >
      {currentChain?.chainId && (
        <ChainOption
          aria-selected={true}
          chain={currentChain}
          className={`${styles.current} ${classNames.current}`}
          onClick={() => setExpand(!isExpanded)}
        />
      )}
      <div className={`${styles.list} ${!isExpanded && `${styles.hidden} ${classNames.hidden}`} ${classNames.list}`}>
        {filteredChains
          .filter((ch) => ch.chainId !== currentChainId)
          .map((ch) => {
            return (
              <ChainOption
                chain={ch}
                key={ch.name}
                onClick={() => switchNetwork(provider, ch)}
                className={classNames.option}
              />
            )
          })}
      </div>
    </div>
  )
}
