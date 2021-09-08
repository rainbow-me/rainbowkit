import React from 'react'
import { useWalletModal } from '@rainbowkit/modal'
import { AccountInfo, withWeb3React } from '@rainbowkit/core'
import { useWeb3React } from '@web3-react/core'
import styles from '../styles/landing.module.css'

const Index = () => {
  const { connect, disconnect, isConnected, Modal, isConnecting, provider, address } = useWalletModal({
    wallets: ['metamask', 'coinbase'],
    chains: ['mainnet', 'polygon', 'optimism']
  })

  return (
    <main className={styles.main}>
      <style jsx global>
        {`
          body {
            min-height: 100vh;
            margin: 0;
            font-family: 'SFRounded', ui-rounded, 'SF Pro Rounded', system-ui, 'Inter', 'Helvetica Neue', Arial,
              Helvetica, sans-serif;
          }
        `}
      </style>
      <header className={styles.header}>
        <h1>RainbowKit</h1>
        <p>The ultimate Dapp framework.</p>
      </header>
      <button
        className={styles.button}
        onClick={() => {
          isConnected ? disconnect() : connect()
        }}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
      {isConnecting && <Modal />}
      <AccountInfo {...{ provider, address }} copyAddress />
    </main>
  )
}

export default withWeb3React(Index)
