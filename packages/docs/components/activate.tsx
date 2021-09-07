import { useConnectOnMount } from '@rainbowkit/core'
import { useWeb3React } from '@web3-react/core'
import React from 'react'
import styles from '../styles/button.module.css'
import { injected } from './badge'

export const Activate = () => {
  const { activate } = useWeb3React()

  useConnectOnMount(injected, true)

  return (
    <button className={styles.button} onClick={() => activate(injected)}>
      Activate connector
    </button>
  )
}
