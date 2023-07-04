/* eslint-disable no-console, import/no-unresolved, import/no-extraneous-dependencies */
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import autoprefixer from 'autoprefixer';
import * as esbuild from 'esbuild';
import postcss from 'postcss';
import prefixSelector from 'postcss-prefix-selector';
import readdir from 'recursive-readdir-files';

const isWatching = process.argv.includes('--watch');
const isCssMinified = process.env.MINIFY_CSS === 'true';

const getAllEntryPoints = async rootPath =>
  (await readdir(rootPath))
    .map(({ path }) => path)
    .filter(
      path =>
        /\.tsx?$/.test(path) &&
        !path.endsWith('.css.ts') &&
        !path.includes('.test.')
    );

const baseBuildConfig = {
  banner: {
    js: '"use client";', // Required for Next 13 App Router
  },
  bundle: true,
  format: 'esm',
  loader: {
    '.png': 'dataurl',
    '.svg': 'dataurl',
  },
  platform: 'browser',
  plugins: [
    vanillaExtractPlugin({
      identifiers: isCssMinified ? 'short' : 'debug',
      processCss: async css => {
        const result = await postcss([
          autoprefixer,
          prefixSelector({ prefix: '[data-rk]' }),
        ]).process(css, {
          from: undefined, // suppress source map warning
        });

        return result.css;
      },
    }),
    {
      name: 'make-all-packages-external',
      setup(build) {
        let filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
        build.onResolve({ filter }, args => ({
          external: true,
          path: args.path,
        }));
      },
    },
  ],
  splitting: true, // Required for tree shaking
};

const mainBuild = esbuild.build({
  ...baseBuildConfig,
  entryPoints: [
    './src/index.ts',

    // esbuild needs these additional entry points in order to support tree shaking while also supporting CSS
    ...(await getAllEntryPoints('src/themes')),

    // The build output is cleaner when bundling all components into a single chunk
    // This is done assuming that consumers use most of the components in the package, which is a reasonable assumption for now
    './src/components/index.ts',
  ],
  outdir: 'dist',
  watch: isWatching
    ? {
        onRebuild(error, result) {
          if (error) console.error('main build failed:', error);
          else console.log('main build succeeded:', result);
        },
      }
    : undefined,
});

const walletsBuild = esbuild.build({
  ...baseBuildConfig,
  entryPoints: await getAllEntryPoints('src/wallets/walletConnectors'),
  outdir: 'dist/wallets/walletConnectors',
  watch: isWatching
    ? {
        onRebuild(error, result) {
          if (error) console.error('wallets build failed:', error);
          else console.log('wallets build succeeded:', result);
        },
      }
    : undefined,
});

Promise.all([mainBuild, walletsBuild])
  .then(() => {
    if (isWatching) {
      console.log('watching...');
    }
  })
  .catch(() => process.exit(1));
