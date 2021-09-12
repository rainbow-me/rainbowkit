import React from 'react'
import { useWalletModal } from '@rainbowkit/modal'
import { AccountInfo, EthAddress, NetworkSelect } from '@rainbowkit/ui'
import { withWeb3React } from '@rainbowkit/utils'
import styles from '../styles/landing.module.css'

const Index = () => {
  const { connect, disconnect, isConnected, Modal, isConnecting, provider, address } = useWalletModal({
    wallets: ['metamask', 'coinbase'],
    chains: ['mainnet', 'polygon', 'optimism']
  })

  return (
    <>
      <nav className={styles.nav}>
        <EthAddress addr={address} balance provider={provider} />
        <NetworkSelect
          provider={provider}
          chains={['mainnet', 'polygon', 'optimism', 'arbitrum']}
          classNames={{
            current: styles.networkSelectCurrent,
            list: styles.networkSelectList,
            option: styles.networkSelectOption,
            icon: styles.icon
          }}
        />
        <button
          className={styles.button}
          onClick={() => {
            isConnected ? disconnect() : connect()
          }}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </nav>
      <main className={styles.main}>
        <style jsx global>
          {`
            body {
              min-height: 100vh;
              margin: 0;
              font-family: 'SFRounded', ui-rounded, 'SF Pro Rounded', system-ui, 'Inter', 'Helvetica Neue', Arial,
                Helvetica, sans-serif;
              background-color: #202c41;
            }
            * {
              color: #c0c0c0;
            }
            main {
              padding: 4vw 12vw;
            }
          `}
        </style>
        <header className={styles.header}>
          <h1>RainbowKit</h1>
          <p>The ultimate Dapp framework.</p>
        </header>

        {isConnecting && <Modal />}
        {isConnected && <AccountInfo {...{ provider, address }} copyAddress />}
      </main>
    </>
  )
}

export default withWeb3React(Index)
