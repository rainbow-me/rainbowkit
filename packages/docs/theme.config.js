import React from 'react'

// theme.config.js
export default {
  github: 'https://github.com/rainbow-me/rainbowkit', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/rainbow-me/rainbowkit/blob/main/packages/docs', // base URL for the docs repository
  titleSuffix: ' – RainbowKit Docs 🌈',
  nextLinks: true,
  prevLinks: true,
  search: true,
  darkMode: true,
  footer: true,
  footerText: `No License Yet ${new Date().getFullYear()} © Rainbow Studios.`,
  footerEditLink: `Edit this page on GitHub`,
  logo: (
    <>
      <span>RainbowKit Docs 🌈</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Rainbow: the next docs builder" />
      <meta name="og:title" content="RainbowKit: Ultimate Web3 UI Framework" />
    </>
  )
}
