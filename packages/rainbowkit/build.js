/* eslint-disable no-console, import/no-unresolved, import/no-extraneous-dependencies */
import * as esbuild from 'esbuild';
import readdir from 'recursive-readdir-files';
import { externals, vanillaExtract } from '../../esbuild/plugins.js';

const isWatching = process.argv.includes('--watch');
const isCssMinified = process.env.MINIFY_CSS === 'true';

const getRecursivePaths = async rootPath =>
  (await readdir(rootPath))
    .map(x => x.path)
    .filter(x => !x.endsWith('.css.ts'));

esbuild
  .build({
    bundle: true,
    entryPoints: [
      './src/index.ts',

      // esbuild needs these additional entry points in order to support tree shaking while also supporting CSS
      ...(await getRecursivePaths('src/themes')),

      // The build output is cleaner when bundling all components into a single chunk
      // This is done assuming that consumers use most of the components in the package, which is a reasonable assumption for now
      './src/components/index.ts',
    ],
    format: 'esm',
    outdir: 'dist',
    platform: 'browser',
    plugins: [
      vanillaExtract({
        identifiers: isCssMinified ? 'short' : 'debug',
      }),
      externals,
    ],
    splitting: true, // Required for tree shaking
    watch: isWatching
      ? {
          onRebuild(error, result) {
            if (error) console.error('watch build failed:', error);
            else console.log('watch build succeeded:', result);
          },
        }
      : undefined,
  })
  .then(() => {
    if (isWatching) {
      console.log('watching...');
    }
  })
  .catch(() => process.exit(1));
