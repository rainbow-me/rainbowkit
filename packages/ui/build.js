import * as esbuild from 'esbuild'
import readdir from 'recursive-readdir-files'
import { externals, vanillaExtract } from '../../esbuild/plugins.js'

const isWatching = process.argv.includes('--watch')

esbuild
  .build({
    entryPoints: (await readdir('src')).map((x) => x.path),
    bundle: true,
    format: 'esm',
    platform: 'browser',
    plugins: [vanillaExtract, externals],
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
