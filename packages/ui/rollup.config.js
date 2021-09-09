import postcss from 'rollup-plugin-postcss'
import image from '@rollup/plugin-image'
import config from '../../rollup.config.js'

export default {
  ...config,
  input: 'src/index.ts',
  plugins: [...config.plugins, postcss({ modules: true }), image()],
  external: [...config.external, '@ethersproject/address']
}
