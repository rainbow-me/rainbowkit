/* eslint-disable @typescript-eslint/no-var-requires */

const withNextra = require('nextra')({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',

  esmExternals: 'loose',
  redirects: async () => {
    return [
      {
        source: '/docs',
        destination: '/docs/get-started',
        permanent: true
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })

    return config
  }
})
module.exports = withNextra()
