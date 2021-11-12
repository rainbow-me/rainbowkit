import * as esbuild from 'esbuild'
import readdir from 'recursive-readdir-files'
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import svgrPlugin from 'esbuild-plugin-svgr'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import { EsmExternalsPlugin } from '@esbuild-plugins/esm-externals'

async function processCss(css) {
  const result = await postcss([autoprefixer]).process(css, {
    from: undefined /* suppress source map warning */
  })

  return result.css
}

esbuild
  .build({
    entryPoints: (await readdir('src')).map((x) => x.path),
    bundle: true,
    format: 'esm',
    plugins: [
      EsmExternalsPlugin({
        externals: ['@rainbow-me/kit-utils', '@vanilla-extract/css', '@web3-react/abstract-connector', 'react']
      }),
      svgrPlugin(),
      vanillaExtractPlugin({
        processCss
      })
    ],

    outdir: 'dist'
  })
  .catch(() => process.exit(1))
