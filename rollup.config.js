import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/index.tsx',
  output: [
    {
      dir: 'dist',
      format: 'esm'
    }
  ],
  plugins: [ts({ include: ['./src/**/*.{ts,tsx}'] }), terser(), filesize()],
  external: ['react']
}
