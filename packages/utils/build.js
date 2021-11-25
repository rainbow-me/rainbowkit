import * as esbuild from 'esbuild'
import { readdir } from 'fs/promises'
import { addExtension, externals } from '../../esbuild/plugins.js'

esbuild.build({
  entryPoints: (await readdir('src')).map((x) => `./src/${x}`),
  bundle: true,
  format: 'esm',
  plugins: [externals, addExtension],
  outdir: 'dist'
})
