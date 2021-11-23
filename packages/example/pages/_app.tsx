import '@rainbow-me/kit-modal/index.css'
import '@rainbow-me/kit-ui/index.css'
import type { AppProps } from 'next/app'
import React from 'react'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
