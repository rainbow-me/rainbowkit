import React, { Suspense, useEffect, useState } from 'react'
import { useClient } from '../src/core'
import QRCode from 'react-qr-code'

const AtomicWallet = () => {
  const [uri, set] = useState('')
  const { session } = useClient({ onURI: set })

  console.log(session)

  return <>{uri && <QRCode value={uri} />}</>
}

export const Wallet = () => {
  return (
    <Suspense fallback={null}>
      <AtomicWallet />
    </Suspense>
  )
}
