// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withDokz } = require('dokz/dist/plugin')

module.exports = withDokz({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
})
