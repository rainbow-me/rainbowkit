import React from 'react'
import type { ModalProps } from '../types'
import styles from '../../styles/modal.module.css'

/**
 * Rainbow-styled Modal
 */
export const Modal = ({ wallets, connect, setConnecting, isConnecting }: ModalProps) => {
  return (
    <div className={isConnecting ? styles.modalOverlay : styles.modalHidden}>
      <div className={styles.modal}>
        <button onClick={() => setConnecting(false)}>Close</button>
        <h1>Connect to Dapp</h1>
        {wallets
          .filter((x) => !x.hidden)
          .map((c) => (
            // TODO: remove temp style
            <button key={c.name} onClick={() => connect(c)} style={{display: 'block'}}>
              {c.name}
            </button>
          ))}
      </div>
    </div>
  )
}
