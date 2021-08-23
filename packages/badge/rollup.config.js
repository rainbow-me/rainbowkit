import postcss from 'rollup-plugin-postcss'
import config from '../../rollup.config.js'

export default {
  ...config,
  input: 'src/index.ts',
  plugins: [...config.plugins, postcss({ modules: true })],
  external: [...config.external, '@ethersproject/address']
}
