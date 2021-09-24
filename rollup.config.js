import ts from '@rollup/plugin-typescript'
// import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'esm'
    }
  ],
  plugins: [ts({ include: ['./src/**/*.{ts,tsx}', './*.d.ts'] }) /* terser({ mangle: false }), filesize() */],
  external: ['react', '@web3-react/core', '@ethersproject/providers']
}
