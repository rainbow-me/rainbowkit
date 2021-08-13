# use-ens

A React hook to fetch ENS records from a domain.

## Install

```sh
pnpm i use-ens
```

## Example

[![CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/useens-demo-q566k)

```jsx
import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useENS } from 'use-ens'

const App = () => {
  const { provider, activate } = useWeb3React()

  useEffect(() => {
      injected.isAuthorized().then((isAuth) => {
        if (isAuth) activate(injected)
      })
    }, [])

  const { address, records } = useENS(provider, 'dame.eth')

  return (
    <>
      <p>Address: {address ? address : ''}</p>
      <p>ENS Records</p>
      <ul>
        {records.web && Object.entries(records.web).map(([k, v]) => (
          <li>
            {k}: {v}
          </li>
        ))}
      </ul>
      {!active && <button onClick={() => activate(injected)}>Connect<button>}
    </>
  )
}
```
