import * as esbuild from 'esbuild'
import readdir from 'recursive-readdir-files'
import linaria from '@linaria/esbuild'

esbuild.build({
  entryPoints: (await readdir('src')).map((x) => x.path),
  bundle: false,
  format: 'esm',
  plugins: [linaria.default()],

  outdir: 'dist'
})
