/* eslint-disable @typescript-eslint/no-var-requires */

const withNextra = require('nextra')({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  redirects: async () => {
    return [
      {
        source: '/docs',
        destination: '/docs/get-started',
        permanent: true
      }
    ]
  }
})
module.exports = withNextra()
