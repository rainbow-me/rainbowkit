import React from 'react'
import 'nextra-theme-docs/style.css'
import '../styles/landing.global.css'
/**
 *
 * @param {import('next/app').AppProps} props
 * @returns
 */
// eslint-disable-next-line react/prop-types
export default function Nextra({ Component, pageProps }) {
  return <Component {...pageProps} />
}
