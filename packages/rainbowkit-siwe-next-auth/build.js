import * as esbuild from 'esbuild';

const isWatching = process.argv.includes('--watch');

esbuild
  .build({
    banner: {
      js: '"use client";', // Required for Next 13 App Router
    },
    bundle: true,
    entryPoints: ['src/index.ts'],
    format: 'esm',
    outdir: 'dist',
    plugins: [
      {
        name: 'make-all-packages-external',
        setup(build) {
          const filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
          build.onResolve({ filter }, (args) => ({
            external: true,
            path: args.path,
          }));
        },
      },
    ],
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
