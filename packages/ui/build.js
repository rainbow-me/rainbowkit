import * as esbuild from 'esbuild'
import readdir from 'recursive-readdir-files'
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

const isWatching = process.argv.includes('--watch')

async function processCss(css) {
  const result = await postcss([autoprefixer]).process(css, {
    from: undefined /* suppress source map warning */
  })

  return result.css
}

let makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup(build) {
    let filter = /^[^./]|^\.[^./]|^\.\.[^/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, (args) => ({ path: args.path, external: true }))
  }
}

esbuild
  .build({
    entryPoints: (await readdir('src')).map((x) => x.path),
    bundle: true,
    format: 'esm',
    platform: 'browser',
    plugins: [
      vanillaExtractPlugin({
        processCss
      }),
      makeAllPackagesExternalPlugin
    ],
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
