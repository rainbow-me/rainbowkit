import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import autoprefixer from 'autoprefixer';
import { config } from 'dotenv';
import * as esbuild from 'esbuild';
import { replace } from 'esbuild-plugin-replace';
import postcss from 'postcss';
import prefixSelector from 'postcss-prefix-selector';
import readdir from 'recursive-readdir-files';

config({ path: '.env.local' });

const isWatching = process.argv.includes('--watch');
const isCssMinified = process.env.MINIFY_CSS === 'true';

const getAllEntryPoints = async (rootPath) =>
  (await readdir(rootPath))
    .map(({ path }) => path)
    .filter(
      (path) =>
        /\.tsx?$/.test(path) &&
        !path.endsWith('.css.ts') &&
        !path.includes('.test.'),
    );

const baseBuildConfig = (onEnd) => {
  const rainbowProviderApiKey = process.env.RAINBOW_PROVIDER_API_KEY;

  if (!rainbowProviderApiKey) {
    throw new Error('missing RAINBOW_PROVIDER_API_KEY env variable');
  }

  return {
    banner: {
      js: '"use client";', // Required for Next 13 App Router
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    loader: {
      '.png': 'dataurl',
      '.svg': 'dataurl',
      '.json': 'text',
    },
    plugins: [
      replace({
        include:
          /src\/components\/RainbowKitProvider\/useFingerprint.ts$|src\/core\/network\/enhancedProvider.ts$/,
        values: {
          __buildVersion: process.env.npm_package_version,
          __rainbowProviderApiKey: rainbowProviderApiKey,
        },
      }),
      vanillaExtractPlugin({
        identifiers: isCssMinified ? 'short' : 'debug',
        processCss: async (css) => {
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
          const filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
          build.onResolve({ filter }, (args) => {
            return {
              external: true,
              path: args.path,
            };
          });

          build.onEnd(onEnd);
        },
      },
    ],
    splitting: true, // Required for tree shaking
  };
};

const mainBuildOptions = {
  ...baseBuildConfig((result) => {
    if (result.errors.length) {
      console.error('❌ main build failed:', result.errors);
    } else console.log('✅ main build succeeded');
  }),
  entryPoints: [
    './src/index.ts',
    // esbuild needs these additional entry points in order to support tree shaking while also supporting CSS
    ...(await getAllEntryPoints('src/themes')),
  ],
  outdir: 'dist',
};

const walletsBuildOptions = {
  ...baseBuildConfig((result) => {
    if (result.errors.length) {
      console.error('❌ wallets build failed', result.errors);
    } else console.log('✅ wallets build succeeded');
  }),
  entryPoints: await getAllEntryPoints('src/wallets/walletConnectors'),
  outdir: 'dist/wallets/walletConnectors',
};

const build = async () => {
  // Build and watch for new changes if --watch flag is passed
  if (isWatching) {
    const [mainContext, walletsContext] = await Promise.all([
      esbuild.context(mainBuildOptions),
      esbuild.context(walletsBuildOptions),
    ]);

    await mainContext.watch();
    await walletsContext.watch();
    return;
  }

  // Only build once
  await Promise.all([
    esbuild.build(mainBuildOptions),
    esbuild.build(walletsBuildOptions),
  ]);
};

build()
  .then(() => {
    if (isWatching) {
      console.log('watching...');
    }
  })
  .catch(() => process.exit(1));
