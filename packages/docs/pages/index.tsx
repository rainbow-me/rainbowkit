import React, { Suspense } from 'react'
import { withWeb3React, useWalletLinkConnector, useInjectedConnector } from '@rainbowkit/core'

const WalletLink = () => {
  const { isConnected, connect, disconnect, address, provider } = useWalletLinkConnector({
    url: 'https://mainnet.infura.io/v3/0c8c992691dc4bfe97b4365a27fb2ce4',
    appName: 'Demo',
    connectOnMount: false
  })

  return (
    <>
      <h1>WalletLink</h1>
      {isConnected ? (
        <div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connect}>Connect</button>
        </div>
      )}
      {isConnected && <p>Address: {address}</p>}
    </>
  )
}

const MetaMask = () => {
  const { isConnected, connect, disconnect, address, provider } = useInjectedConnector({ connectOnMount: true })

  return (
    <>
      <h1>Metamask</h1>
      {isConnected ? (
        <div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connect}>Connect</button>
        </div>
      )}
      {isConnected && <p>Address: {address}</p>}
    </>
  )
}

const Index = () => {
  return (
    <>
      {/*  <WalletLink /> */}
      <MetaMask />
    </>
  )
}

export default withWeb3React(Index)
