import postcss from 'rollup-plugin-postcss'
import config from '../../rollup.config.js'
import image from '@rollup/plugin-image'

export default {
  ...config,
  input: 'src/index.tsx',
  plugins: [...config.plugins, postcss({ modules: true, minimize: false }), image()]
}
