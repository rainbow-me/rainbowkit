import { css } from '@linaria/core'
import { useConnectOnMount } from '@rainbowkit/hooks'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { injected } from './badge'

const button = css`
  border: 3px solid black;
  padding: 0.4rem;
  margin: 20px 0;
  font-weight: bold;
`

export const Activate = () => {
  const { activate } = useWeb3React()

  useConnectOnMount(injected, true)

  return (
    <button className={button} onClick={() => activate(injected)}>
      Activate connector
    </button>
  )
}
