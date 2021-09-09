import React, { useState, useEffect } from 'react'
import { useWalletModal } from '@rainbowkit/modal'
import usePortal from 'react-useportal'
import styles from '../styles/button.module.css'
import { Web3ReactProvider } from '@web3-react/core'
import { setupProvider } from '@rainbowkit/utils'

const ModalExample = () => {
  const { Portal } = usePortal()

  const { disconnect, isConnected, connect, Modal, isConnecting, address } = useWalletModal({
    wallets: ['metamask', 'coinbase', 'frame'],
    chains: ['mainnet'],
    terms: (
      <span>
        By connecting a wallet, you acknowledge that you have read and agree to the RainbowKit{' '}
        <a href="/tos">Terms of Service</a>.
      </span>
    )
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
export const Modal = () => (
  <Web3ReactProvider getLibrary={setupProvider()}>
    <ModalExample />
  </Web3ReactProvider>
)
