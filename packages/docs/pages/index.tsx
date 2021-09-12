import React from 'react'
import { useWalletModal } from '@rainbowkit/modal'
import { AccountInfo, EthAddress, NetworkSelect, TxHistory } from '@rainbowkit/ui'
import { withWeb3React } from '@rainbowkit/utils'
import styles from '../styles/landing.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { etherscanFetcher, useChainId } from '@rainbowkit/hooks'
import { EtherscanProvider } from '@ethersproject/providers'

const etherscan = new EtherscanProvider('homestead', '8BXAX6RUPGRKGVUKPJ54RJ1C9696QQBRIC')

const Index = () => {
  const { connect, disconnect, isConnected, Modal, isConnecting, provider, address } = useWalletModal({
    wallets: ['metamask', 'coinbase'],
    chains: ['mainnet', 'polygon', 'optimism']
  })

  const [fromBlock, setFromBlock] = useState(0)

  const chainId = useChainId({ provider, initialChainId: 1 })

  useEffect(() => {
    if (provider) {
      provider.getBlockNumber().then((block) => {
        setFromBlock(block - 500)
      })
      provider.on('chainChanged', () => {
        provider.getBlockNumber().then((block) => {
          setFromBlock(block - 500)
        })
      })
    }
  }, [provider])

  return (
    <>
      <nav className={styles.nav}>
        <EthAddress addr={address} balance provider={provider} />
        <NetworkSelect
          provider={provider}
          chains={['mainnet', 'polygon', 'optimism', 'arbitrum', 'kovan']}
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
        {isConnected && (
          <>
            <AccountInfo {...{ provider, address }} copyAddress />
            <div className={styles.inline}>
              <button
                className={styles.button}
                onClick={() =>
                  provider
                    .getSigner()
                    .signMessage('Hello World')
                    .then((sig) => alert(`Signature: ${sig}`))
                    .catch((error) => alert(error.message))
                }
              >
                Sign message
              </button>
              <button
                className={styles.button}
                onClick={async () => {
                  if (provider) {
                    const res = await provider.send('eth_sendTransaction', [
                      {
                        from: address,
                        to: address,
                        value: '0x0'
                      }
                    ])
                    console.log(res)
                  }
                }}
              >
                Send 0 ETH to yourself
              </button>
            </div>
            {fromBlock && chainId === 1 && (
              <>
                <TxHistory
                  {...{ address }}
                  provider={etherscan}
                  fetcher={etherscanFetcher}
                  options={{ fromBlock: 13061959, toBlock: 13073635 }}
                />
              </>
            )}
          </>
        )}
      </main>
    </>
  )
}

export default withWeb3React(Index)
