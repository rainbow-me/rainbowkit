import * as esbuild from 'esbuild'
import { readdir } from 'fs/promises'

esbuild.build({
  entryPoints: (await readdir('src')).map((x) => `./src/${x}`),
  bundle: false,
  format: 'esm',
  plugins: [],
  outdir: 'dist'
})
