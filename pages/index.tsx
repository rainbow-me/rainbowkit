import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useWallet, withWeb3React } from '../src/index'

const Index = () => {
  const { isConnected, connect, disconnect, address } = useWallet()

  return (
    <>
      {isConnected ? (
        <div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connect}>Connect</button>
        </div>
      )}
      {address}
    </>
  )
}

export default withWeb3React(Index)
