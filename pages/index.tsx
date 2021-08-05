import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useWallet, withWeb3React } from '../src/index'
import { useEffect } from 'react'
import { useState } from 'react'
import { formatEther } from '@ethersproject/units'

const Index = () => {
  const { isConnected, connect, disconnect, address, provider } = useWallet()

  const [bal, set] = useState('')

  useEffect(() => {
    provider?.getBalance(address).then((x) => set(formatEther(x)))
  }, [provider])

  return (
    <>
      <h1>MetaMask</h1>
      {isConnected ? (
        <div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <button onClick={connect}>Connect</button>
        </div>
      )}
      {isConnected && (
        <>
          {address}: {bal.slice(0, 5)} ETH
        </>
      )}
    </>
  )
}

export default withWeb3React(Index)
