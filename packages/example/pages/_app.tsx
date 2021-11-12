import React from 'react'
import { withWeb3React } from '@rainbow-me/kit-utils'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default withWeb3React(App)
