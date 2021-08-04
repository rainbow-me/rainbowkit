import React, { Suspense, useEffect } from 'react'
import { createClient } from '../src/core'

const AtomicWallet = () => {
  useEffect(() => {
    createClient().then((client) =>
      client
        .connect({
          permissions: {
            blockchain: {
              chains: ['homestead']
            },
            jsonrpc: {
              methods: ['eth_sendTransaction', 'personal_sign', 'eth_signTypedData']
            }
          }
        })
        .then(console.log)
    )
  }, [])

  return <></>
}

export const Wallet = () => {
  return (
    <Suspense fallback={null}>
      <AtomicWallet />
    </Suspense>
  )
}
