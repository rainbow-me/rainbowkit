import * as esbuild from 'esbuild';

const isWatching = process.argv.includes('--watch');

const mainBuildOptions = {
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
        build.onEnd((result) => {
          if (result.errors.length) {
            console.error('❌ main build failed', result.errors);
          } else console.log('✅ main build succeeded');
        });
      },
    },
  ],
};

const build = async () => {
  // Build and watch for new changes if --watch flag is passed
  if (isWatching) {
    const [mainContext] = await Promise.all([
      esbuild.context(mainBuildOptions),
    ]);

    await mainContext.watch();
    return;
  }

  // Only build once
  await esbuild.build(mainBuildOptions);
};

build()
  .then(() => {
    if (isWatching) {
      console.log('watching...');
    }
  })
  .catch(() => process.exit(1));
