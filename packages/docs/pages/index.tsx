import React, { useState, useEffect } from 'react'
import { AccountInfo, NetworkSelect, TxHistory, Profile } from '@rainbowkit/ui'
import { etherscanFetcher, withWeb3React, chainIdToName } from '@rainbowkit/utils'
import styles from '../styles/landing.module.css'
import { useWeb3State } from '@rainbowkit/hooks'
import { ChainProvider } from 'chain-provider'
import { useMemo } from 'react'
import { chainIDToToken } from '@rainbowkit/core'

const Index = () => {
  const { provider, address, isConnected, chainId } = useWeb3State()

  const [fromBlock, setFromBlock] = useState(0)

  const [explorer, setExplorer] = useState<ChainProvider>()

  const symbol = useMemo(() => chainIDToToken(chainId), [chainId])

  useEffect(() => {
    if (provider) {
      provider.getBlockNumber().then((block) => {
        setFromBlock(block - 500)
        provider.getNetwork().then((chainId) => setExplorer(new ChainProvider(chainIdToName(chainId))))
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
          </>
        )}
      </main>
    </>
  )
}

export default withWeb3React(Index)
