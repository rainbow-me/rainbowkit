import React from 'react'
import { withWeb3React } from '@rainbow-me/kit-core'
import { AppProps } from 'next/app'
import '@rainbow-me/kit-ui/bundle.css'
import '@rainbow-me/kit-modal/bundle.css'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default withWeb3React(App)
