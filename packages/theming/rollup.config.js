import css from 'rollup-plugin-css-only'
import config from '../../rollup.config.js'
import linaria from '@linaria/rollup'

export default {
  ...config,
  input: 'src/index.ts',
  plugins: [...config.plugins, linaria({}), css({})],
  external: [...config.external, '@ethersproject/address']
}
