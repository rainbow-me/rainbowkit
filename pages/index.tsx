import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Wallet = dynamic(() => import('../components/Wallet').then((m) => m.Wallet), { ssr: false })

const Index = () => {
  return (
    <div>
      <Wallet />
    </div>
  )
}

export default Index
