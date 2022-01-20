import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

async function processCss(css) {
  const result = await postcss([autoprefixer]).process(css, {
    from: undefined, // suppress source map warning
  });

  return result.css;
}

export const vanillaExtract = ({ identifiers = 'debug' } = {}) =>
  vanillaExtractPlugin({
    identifiers,
    processCss,
  });

export const externals = {
  name: 'make-all-packages-external',
  setup(build) {
    let filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, args => ({ external: true, path: args.path }));
  },
};

export const addExtension = {
  name: 'add-file-extension',
  setup(build) {
    build.onResolve({ filter: /.*/ }, args => {
      if (args.importer) return { external: true, path: args.path + '.js' };
    });
  },
};
