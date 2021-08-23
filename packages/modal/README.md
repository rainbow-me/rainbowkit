# @rainbowkit/modal

Ultimate wallet modal solution for React.

## Install

```sh
pnpm i @rainbowkit/modal
```

## Example

```jsx
import React, { useState, useEffect } from 'react'
import { Connector, useWalletModal } from '@rainbowkit/modal'
import { withWeb3React } from '@rainbowkit/util'
import { useWeb3React } from '@web3-react/core'

const App = () => {
  const { disconnect, isConnected, connect, Modal, isConnecting, address } = useWalletModal({
    wallets: ['coinbase', 'metamask'],
    chains: ['mainnet', 'polygon']
  })

  return (
    <>
      <button onClick={() => (isConnected ? disconnect() : connect())}>
        {isConnected ? 'Disconnect' : 'Connect Wallet'}
      </button>
      {isConnecting && <Modal />}
    </>
  )
}
```
