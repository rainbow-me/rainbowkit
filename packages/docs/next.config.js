/* eslint-disable @typescript-eslint/no-var-requires */

const withNextra = require('nextra')({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js'
  // optional: add `unstable_staticImage: true` to enable Nextra's auto image import
})
module.exports = withNextra()
