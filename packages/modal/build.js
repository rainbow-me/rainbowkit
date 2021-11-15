import * as esbuild from 'esbuild'
import readdir from 'recursive-readdir-files'
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import svgrPlugin from 'esbuild-plugin-svgr'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
// import { EsmExternalsPlugin } from '@esbuild-plugins/esm-externals'

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
      svgrPlugin(),
      vanillaExtractPlugin({
        processCss
      }),
      makeAllPackagesExternalPlugin
    ],

    outdir: 'dist'
  })
  .catch(() => process.exit(1))
