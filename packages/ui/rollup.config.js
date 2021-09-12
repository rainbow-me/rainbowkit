import css from 'rollup-plugin-css-only'
import image from '@rollup/plugin-image'
import config from '../../rollup.config.js'
import linaria from '@linaria/rollup'
export default {
  ...config,
  input: 'src/index.ts',
  plugins: [...config.plugins, image(), linaria({}), css({})],
  external: [...config.external, '@ethersproject/address']
}
