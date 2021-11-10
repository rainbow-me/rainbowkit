import * as esbuild from 'esbuild'
import readdir from 'recursive-readdir-files'
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import svgrPlugin from 'esbuild-plugin-svgr'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

async function processCss(css) {
  const result = await postcss([autoprefixer]).process(css, {
    from: undefined /* suppress source map warning */
  })

  return result.css
}

esbuild
  .build({
    entryPoints: (await readdir('src')).map((x) => x.path),
    bundle: false,
    format: 'esm',
    plugins: [
      svgrPlugin(),
      vanillaExtractPlugin({
        processCss
      })
    ],

    outdir: 'dist'
  })
  .catch(() => process.exit(1))
