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
    {chain.logoURL && <img src={chain.logoURL} />} {chain.name} {children}
  </div>
)

export const NetworkSelect = ({ chains: chainNames, provider, classNames }: NetworkSelectProps) => {
  const currentChainId = useChainId({ initialChainId: 1, provider })

  const [isExpanded, setExpand] = useState(false)

  const currentChain = useMemo(() => chains.find((chain) => chain.chainId === currentChainId), [currentChainId])

  const filteredChains = useMemo(() => chains.filter((chain) => hasSubArray(chainNames, chain.aliases)), [chainNames])

  return (
    <div
      aria-label="select"
      aria-roledescription="Select a dapp network"
      className={`${styles.select} ${classNames.select}`}
    >
      {currentChain?.chainId && (
        <ChainOption
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
