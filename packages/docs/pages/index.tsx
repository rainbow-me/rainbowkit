import React, { useState, useEffect, useMemo } from 'react'
import {
  etherscanFetcher,
  withWeb3React,
  chainIdToAlias,
  AccountInfo,
  NetworkSelect,
  TxHistory,
  walletConnectRPCs,
  Profile
} from '@rainbow-me/kit-core'
import { useTxHistory, useWeb3State, useSignMessage } from '@rainbow-me/kit-hooks'
import { ChainProvider } from 'chain-provider'
import { InfuraWebSocketProvider } from '@ethersproject/providers'
import type { WalletConnectConnectorArguments } from '@web3-react/walletconnect-connector'
import { zrx } from '../lib/zrx'
import { Nav, Main, Inline, Button, Header, Icon } from '../components/layout'
import { css } from '@linaria/core'

const mainnetProvider = new InfuraWebSocketProvider('homestead', '372913dfd3114b34983d2256c46195a7')

const wcOptions = {
  connectorName: 'walletconnect',
  options: {
    rpc: walletConnectRPCs
  } as WalletConnectConnectorArguments
}

const Index = () => {
  const { provider, address, isConnected, chainId } = useWeb3State()

  const [fromBlock, setFromBlock] = useState(0)

  const [explorer, setExplorer] = useState<ChainProvider>()

  const sign = useSignMessage({ provider, message: 'Hello' })

  const { txes, submit, reset } = useTxHistory({ provider, rememberHistory: true })

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
          ipfsGatewayUrl="ipfs.io"
          modalOptions={{
            chains: ['mainnet', 'polygon', 'optimism', 'arbitrum', 'kovan', 'ropsten'],
            wallets: [
              'metamask',
              'coinbase',
              {
                name: 'rainbow',
                ...wcOptions
              },
              {
                name: 'trust',
                hidden: true,
                ...wcOptions
              },
              {
                name: 'gnosis',
                hidden: true,
                ...wcOptions
              },
              {
                name: 'argent',
                hidden: true,
                ...wcOptions
              }
            ],
            terms: (
              <>
                By connecting, you acknowledge that you’ve read and agree to the{' '}
                <a>RainbowKit&apos;s Terms of Service.</a>
              </>
            )
          }}
          classNames={{
            pill: css`
              background: linear-gradient(#001a1f) padding-box, linear-gradient(to right, #f14444, #4f4fd6) border-box;
              color: #ebebeb;
            `,
            menu: css`
              background: #17181c;
            `
          }}
        />
        <NetworkSelect
          {...{ provider, chainId }}
          chains={['mainnet', 'polygon', 'optimism', 'arbitrum', 'kovan', 'ropsten']}
          classNames={{
            current: Button,
            icon: Icon,
            list: css`
              background-color: #001a1f;
            `
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
                onClick={async () => {
                  if ([1, 3, 137].includes(chainId)) {
                    const tx = await zrx(chainId, provider)

                    if (typeof tx !== 'string') submit(tx)
                  }
                }}
              >
                {[1, 3, 137].includes(chainId) ? 'Swap 1 USDC to 1 DAI' : 'Switch to Mainnet, Ropsten or Polygon'}
              </button>
            </Inline>

            <TxHistory {...{ chainId, provider, txes, reset }} />
          </>
        )}
      </Main>
    </>
  )
}

export default withWeb3React(Index)
