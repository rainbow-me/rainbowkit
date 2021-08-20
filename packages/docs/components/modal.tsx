import React, { useState, useEffect } from 'react'
import { Wallet, useWalletModal } from '@rainbowkit/modal'
import { withWeb3React } from '@rainbowkit/util'
import usePortal from 'react-useportal'
import styles from '../styles/button.module.css'

const ModalExample = () => {
  const { Portal } = usePortal()

  const { disconnect, isConnected, connect, Modal, isConnecting, address } = useWalletModal({
    wallets: ['metamask', 'coinbase'],
    chains: ['polygon', 'mainnet']
  })

  return (
    <>
      <pre>
        {JSON.stringify(
          {
            isConnected,
            isConnecting,
            address
          },
          null,
          2
        )}
      </pre>
      <button className={styles.modalButton} onClick={() => (isConnected ? disconnect() : connect())}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </button>
      <Portal>{isConnecting && <Modal />} </Portal>
    </>
  )
}
export const Modal = withWeb3React(ModalExample)
