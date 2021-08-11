# use-ens

A React hook to fetch ENS data.

## Install

```sh
pnpm i use-ens
```

## Usage

```jsx
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { useENS } from 'use-ens'

const App = () => {
  const { provider } = useWeb3React()

  const { address, records } = useENS(provider)('example.eth')

  return (
    <>
      <p>Address: {address ? address : ''}</p>
      <p>ENS Records</p>
      <ul>
        {Object.entries(records).map(([k, v]) => (
          <li>
            {k}: {v}
          </li>
        ))}
      </ul>
    </>
  )
}
```
