import postcss from 'rollup-plugin-postcss'
import config from '../../rollup.config.js'

export default {
  ...config,
  input: 'src/index.tsx',
  plugins: [...config.plugins, postcss({ modules: true })]
}
