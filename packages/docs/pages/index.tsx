import React, { useState, useEffect } from 'react'
import { AccountInfo, NetworkSelect, TxHistory, Profile } from '@rainbowkit/ui'
import { etherscanFetcher, withWeb3React, chainIdToAlias } from '@rainbowkit/utils'
import styles from '../styles/landing.module.css'
import { useWeb3State, usePendingTx, useSignMessage } from '@rainbowkit/hooks'
import { ChainProvider } from 'chain-provider'
import { useMemo } from 'react'
import { chainIDToToken, chainIDToExplorer } from '@rainbowkit/utils'

const Index = () => {
  const { provider, address, isConnected, chainId } = useWeb3State()

  const [fromBlock, setFromBlock] = useState(0)

  const [explorer, setExplorer] = useState<ChainProvider>()

  const symbol = useMemo(() => chainIDToToken(chainId), [chainId])

  const txes = usePendingTx({ provider })

  const sign = useSignMessage({ provider, message: 'Hello' })

  useEffect(() => {
    if (chainId) setExplorer(new ChainProvider(chainIdToAlias(chainId)))
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
  }, [provider, chainId])

  return (
    <>
      <nav className={styles.nav}>
        <Profile
          copyAddress
          modalOptions={{
            chains: ['mainnet', 'polygon', 'optimism', 'arbitrum', 'kovan'],
            wallets: ['metamask', 'coinbase'],
            terms: (
              <>
                By connecting, you acknowledge that you’ve read and agree to the{' '}
                <a>RainbowKit&apos;s Terms of Service.</a>
              </>
            )
          }}
        />
        <NetworkSelect
          {...{ provider, chainId }}
          chains={['mainnet', 'polygon', 'optimism', 'arbitrum', 'kovan']}
          classNames={{
            current: styles.networkSelectCurrent,
            list: styles.networkSelectList,
            option: styles.networkSelectOption,
            icon: styles.icon
          }}
        />
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
        {isConnected && (
          <>
            <AccountInfo {...{ provider, address }} copyAddress />
            <div className={styles.inline}>
              <button
                className={styles.button}
                onClick={() =>
                  sign()
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
                    const tx = await provider.send('eth_sendTransaction', [
                      {
                        from: address,
                        to: address,
                        value: '0x0'
                      }
                    ])
                    alert(`Success! View on explorer: ${chainIDToExplorer(chainId).url}/tx/${tx}`)
                  }
                }}
              >
                Send 0 {symbol} to yourself
              </button>
            </div>
            {fromBlock && chainId === 1 && (
              <>
                <TxHistory
                  {...{ address, chainId }}
                  provider={explorer}
                  fetcher={etherscanFetcher}
                  options={{ fromBlock: 13061959, toBlock: 13073635 }}
                />
              </>
            )}
            {JSON.stringify(txes, null, 2)}
          </>
        )}
      </main>
    </>
  )
}

export default withWeb3React(Index)
