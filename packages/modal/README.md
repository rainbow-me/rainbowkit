# @rainbowkit/modal

Ultimate wallet modal solution for React.

## Install

```sh
pnpm i @rainbowkit/modal
```

## Example

```jsx
import React from 'react'
import { initWallets, useWalletModal } from '@rainbowkit/modal'

const wallets = initWallets({ chains: [1], wallets: ['metamask'] })

const App = () => {
  const { disconnect, isConnected, connect, Modal, isConnecting } = useWalletModal({
    wallets,
    modal: ({ wallets, connect, close }) => (
      <div>
        <h1>Connect to Dapp</h1>
        {wallets.map((w) => (
          <button onClick={connect(w)}>{w.name}</button>
        ))}
      </div>
    )
  })

  return (
    <>
      <button onClick={() => (isConnected ? disconnect() : connect())}>Connect Wallet</button>
      {isConnecting && <Modal />}
    </>
  )
}
```
