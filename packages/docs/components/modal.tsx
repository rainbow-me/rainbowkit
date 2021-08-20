import React, { useState, useEffect } from 'react'
import { Connector, initWallets, useWalletModal } from '@rainbowkit/modal'
import { withWeb3React } from '@rainbowkit/util'
import usePortal from 'react-useportal'
import styles from '../styles/button.module.css'

const ModalExample = () => {
  const [connectors, set] = useState<Connector[]>([])

  const { Portal } = usePortal()

  useEffect(() => {
    initWallets({ chains: [1], wallets: ['metamask'] }).then(set)
  }, [])

  const { disconnect, isConnected, connect, Modal, isConnecting, address } = useWalletModal({
    connectors
  })

  return (
    <>
      <pre>
        {JSON.stringify({
          isConnected,
          isConnecting,
          address
        })}
      </pre>
      <button className={styles.modalButton} onClick={() => (isConnected ? disconnect() : connect())}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </button>
      <Portal>{isConnecting && <Modal />} </Portal>
    </>
  )
}
export const Modal = withWeb3React(ModalExample)
