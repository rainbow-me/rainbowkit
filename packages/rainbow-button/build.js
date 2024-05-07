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

const stylesBuildOptions = {
  entryPoints: ['../rainbowkit/dist/index.css'],
  outdir: 'dist',
  plugins: [
    {
      name: 'log-results', // Log the result of the build
      setup(build) {
        build.onEnd((result) => {
          if (result.errors.length) {
            console.error('❌ styling build failed', result.errors);
          } else console.log('✅ styling build succeeded');
        });
      },
    },
  ],
};

const build = async () => {
  // Build and watch for new changes if --watch flag is passed
  if (isWatching) {
    const [mainContext, walletsContext] = await Promise.all([
      esbuild.context(mainBuildOptions),
      esbuild.context(stylesBuildOptions),
    ]);

    await mainContext.watch();
    await walletsContext.watch();
    return;
  }

  // Only build once
  await Promise.all([
    esbuild.build(mainBuildOptions),
    esbuild.build(stylesBuildOptions),
  ]);
};

build()
  .then(() => {
    if (isWatching) {
      console.log('watching...');
    }
  })
  .catch(() => process.exit(1));
