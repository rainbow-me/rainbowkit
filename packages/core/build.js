import * as esbuild from 'esbuild'
import { readdir } from 'fs/promises'
import { addExtension, externals } from '../../esbuild/plugins.js'

const isWatching = process.argv.includes('--watch')

esbuild
  .build({
    entryPoints: (await readdir('src')).map((x) => `./src/${x}`),
    bundle: true,
    format: 'esm',
    plugins: [externals, addExtension],
    watch: isWatching
      ? {
          onRebuild(error, result) {
            if (error) console.error('watch build failed:', error)
            else console.log('watch build succeeded:', result)
          }
        }
      : undefined,
    outdir: 'dist'
  })
  .then(() => {
    if (isWatching) {
      console.log('watching...')
    }
  })
  .catch(() => process.exit(1))
