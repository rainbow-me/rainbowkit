import React from 'react'
import type { ModalProps } from '../types'
import styles from '../../styles/modal.module.css'

export const Modal = ({ connectors, connect, setConnecting, isConnecting }: ModalProps) => {
  return (
    <div className={isConnecting ? styles.modalOverlay : styles.modalHidden}>
      <div className={styles.modal}>
        <button onClick={() => setConnecting(false)}>Close</button>
        <h1>Connect to Dapp</h1>
        {connectors
          .filter((x) => !x.hidden)
          .map((w) => (
            <button
              key={w.name}
              onClick={() => {
                connect(w.connector).then(() => setConnecting(false))
              }}
            >
              {w.name}
            </button>
          ))}
      </div>
    </div>
  )
}
