import { ColorModeSwitch, DokzProvider, GithubLink } from 'dokz'
import React from 'react'

import { useRouter } from 'next/router'

import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const { pathname } = useRouter()

  if (pathname.startsWith('/docs')) {
    return (
      <ChakraProvider cssVarsRoot="__next" resetCSS>
        <DokzProvider
          headerLogo={<span>🌈 RainbowKit</span>}
          docsRootPath="pages/docs"
          initialColorMode="dark"
          headerItems={[<GithubLink key="0" url="https://github.com/remorses/dokz" />, <ColorModeSwitch key="1" />]}
        >
          <Component {...pageProps} />
        </DokzProvider>
      </ChakraProvider>
    )
  }

  return <Component {...pageProps} />
}
