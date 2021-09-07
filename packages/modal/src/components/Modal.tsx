import React, { useEffect, useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import styles from '../../styles/modal.module.css'
import close from '../../assets/close.svg'
import next from '../../assets/next.svg'
import { getIcon } from '../utils'

/**
 * Rainbow-styled Modal
 */
export const Modal = ({ wallets, connect, setConnecting, isConnecting, terms, classNames }: ModalProps) => {
  return (
    <div
      className={
        isConnecting ? `${styles.modalOverlay} ${classNames?.overlay}` : `${styles.modalHidden} ${classNames?.hidden}`
      }
    >
      <div className={`${styles.modal} ${classNames?.modal}`}>
        <button className={`${styles.close} ${classNames?.close}`} onClick={() => setConnecting(false)}>
          <img src={close} />
        </button>
        <div>
          <span className={`${styles.title} ${classNames?.title}`}>Connect to a wallet</span>
          <span className={`${styles.caption} ${classNames?.caption}`}>Choose your preferred wallet</span>

          <ul className={`${styles.wallets} ${classNames?.wallets}`}>
            {wallets
              .filter((x) => !x.hidden)
              .map((c) => {
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
        {terms && <div className={`${styles.terms} ${classNames?.terms}`}>{terms}</div>}
      </div>
    </div>
  )
}
