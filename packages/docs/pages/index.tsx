import React, { useState, useEffect, useMemo } from 'react'
import {
  etherscanFetcher,
  withWeb3React,
  chainIdToAlias,
  useSignMessage,
  usePendingTx,
  useWeb3State,
  AccountInfo,
  NetworkSelect,
  TxHistory,
  walletConnectRPCs,
  Profile
} from '@rainbowkit/core'
import styles from '../styles/landing.module.css'
import { ChainProvider } from 'chain-provider'
import { InfuraWebSocketProvider } from '@ethersproject/providers'
import type { WalletConnectConnectorArguments } from '@web3-react/walletconnect-connector'
import { matcha } from '../lib/matcha'
import { Nav, Main, Inline, Button, Header, Icon } from '../components/layout'

const mainnetProvider = new InfuraWebSocketProvider('homestead', '372913dfd3114b34983d2256c46195a7')

const Index = () => {
  const { provider, address, isConnected, chainId } = useWeb3State()

  const [fromBlock, setFromBlock] = useState(0)

  const [explorer, setExplorer] = useState<ChainProvider>()

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
      <Nav>
        <Profile
          rpcProvider={mainnetProvider}
          copyAddress
          modalOptions={{
            chains: ['mainnet', 'polygon', 'optimism', 'arbitrum', 'kovan'],
            wallets: [
              'metamask',
              'coinbase',
              {
                name: 'rainbow',
                connectorName: 'walletconnect',
                options: {
                  rpc: walletConnectRPCs
                } as WalletConnectConnectorArguments
              }
            ],
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
            current: Button,
            icon: Icon
          }}
        />
      </Nav>

      <Main>
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

        <Header>
          <h1>RainbowKit</h1>
          <p>The ultimate Dapp framework.</p>
        </Header>
        {isConnected && (
          <>
            <AccountInfo {...{ provider, address }} copyAddress />
            <Inline>
              <button
                className={Button}
                onClick={() =>
                  sign()
                    .then((sig) => alert(`Signature: ${sig}`))
                    .catch((error) => alert(error.message))
                }
              >
                Sign message
              </button>
              <button
                className={Button}
                onClick={() => {
                  if (chainId === 137 || chainId === 1) {
                    matcha(chainId, provider, address).then((obj) => {
                      console.log(obj)
                    })
                  }
                }}
              >
                {chainId === 137 || chainId === 1 ? 'Swap 10 USDT to 10 USDC' : 'Switch to Mainnet or Polygon'}
              </button>
            </Inline>
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
      </Main>
    </>
  )
}

export default withWeb3React(Index)
