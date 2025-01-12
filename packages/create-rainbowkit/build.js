import * as esbuild from 'esbuild';

// Check if the --watch flag is passed in the command line arguments
const isWatching = process.argv.includes('--watch');

// Configuration for the main build
const mainBuildOptions = {
  bundle: true, // Bundle all dependencies into a single file
  entryPoints: ['./src/cli.ts'], // Entry point for the build
  format: 'esm', // Output format as ES modules
  outdir: 'dist', // Output directory for the build
  platform: 'node', // Target platform is Node.js
  plugins: [
    {
      name: 'make-all-packages-external',
      setup(build) {
        // Regex to match imports that are not relative (e.g., 'lodash' instead of './lodash')
        const filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
        build.onResolve({ filter }, (args) => ({
          external: true, // Mark these imports as external (not bundled)
          path: args.path, // Preserve the original import path
        }));

        // Log build results (success or failure)
        build.onEnd((result) => {
          if (result.errors.length) {
            console.error('❌ main build failed', result.errors);
            process.exit(1); // Exit with error code if there are build errors
          } else {
            console.log('✅ main build succeeded');
          }
        });
      },
    },
  ],
};

// Build function to handle both single build and watch mode
const build = async () => {
  // If --watch flag is passed, enable watch mode
  if (isWatching) {
    // Create a build context for watch mode
    const mainContext = await esbuild.context(mainBuildOptions);
    await mainContext.watch(); // Start watching for changes
    return;
  }

  // If not in watch mode, perform a single build
  await esbuild.build(mainBuildOptions);
};

// Execute the build process
build()
  .then(() => {
    // Log a message if in watch mode
    if (isWatching) {
      console.log('watching...');
    }
  })
  .catch((error) => {
    // Log any errors that occur during the build process
    console.error('❌ Build failed:', error);
    process.exit(1); // Exit with error code if the build fails
  });
