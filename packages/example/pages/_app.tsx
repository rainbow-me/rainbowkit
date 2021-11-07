import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@rainbow-me/kit-ui'
import '@rainbow-me/kit-ui/dist/bundle.css'
import '@rainbow-me/kit-theming/dist/bundle.css'
import '@rainbow-me/kit-modal/dist/bundle.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
