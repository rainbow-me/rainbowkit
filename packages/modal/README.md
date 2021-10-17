# @rainbow-me/kit-modal

Universal Ethereum wallet modal library for React.

## Install

```sh
pnpm i @rainbow-me/kit-modal
```

## Example

```jsx
import React, { useState, useEffect } from 'react'
import { Connector, useWalletModal } from '@rainbow-me/kit-modal'
import { withWeb3React } from '@rainbow-me/kit-util'
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
