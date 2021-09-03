import React, { useEffect, useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import styles from '../../styles/modal.module.css'
import close from '../../assets/close.svg'
import next from '../../assets/next.svg'
import { getIcon } from '../utils'

/**
 * Rainbow-styled Modal
 */
export const Modal = ({ wallets, connect, setConnecting, isConnecting, terms }: ModalProps) => {
  return (
    <div className={isConnecting ? styles.modalOverlay : styles.modalHidden}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={() => setConnecting(false)}>
          <img src={close} />
        </button>
        <div>
          <span className={styles.title}>Connect to a wallet</span>
          <span className={styles.caption}>Choose your preferred wallet</span>

          <ul className={styles.wallets}>
            {wallets
              .filter((x) => !x.hidden)
              .map((c, i) => {
                return (
                  <li key={c.name}>
                    <button onClick={() => connect(c)}>
                      <span>
                        <img className={styles.icon} src={getIcon(c.name)} />
                        {c.name}
                      </span>
                      <img src={next} alt={`Select ${c.name}`} />
                    </button>
                  </li>
                )
              })}
          </ul>
        </div>
        {terms && <div>{terms}</div>}
      </div>
    </div>
  )
}
