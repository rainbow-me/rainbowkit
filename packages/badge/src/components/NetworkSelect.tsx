import React from 'react'
import { chains } from '@rainbowkit/utils'
import { useMemo } from 'react'

export interface NetworkSelectProps {
  chains: string[]
}

function hasSubArray(master: string[], sub: string[]) {
  return sub.every(
    (
      (i) => (v: string) =>
        (i = master.indexOf(v, i) + 1)
    )(0)
  )
}

export const NetworkSelect = ({ chains: chainNames }: NetworkSelectProps) => {
  const filteredChains = useMemo(() => chains.filter((chain) => hasSubArray(chainNames, chain.aliases)), [chainNames])

  return (
    <select>
      {filteredChains.map((ch) => (
        <option key={ch.name}>{ch.name}</option>
      ))}
    </select>
  )
}
