import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'

async function processCss(css) {
  const result = await postcss([autoprefixer]).process(css, {
    from: undefined /* suppress source map warning */
  })

  return result.css
}

export const vanillaExtract = vanillaExtractPlugin({
  processCss
})

export const externals = {
  name: 'make-all-packages-external',
  setup(build) {
    let filter = /^[^./]|^\.[^./]|^\.\.[^/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, (args) => ({ path: args.path, external: true }))
  }
}

export const addExtension = {
  name: 'add-file-extension',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.importer) return { path: args.path + '.js', external: true }
    })
  }
}
