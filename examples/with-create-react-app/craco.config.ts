import webpack from 'webpack';

export default {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
        },
      },
      plugins: [
        // CRA 5 does not provide polyfills by default.
        // https://github.com/facebook/create-react-app/issues/11756
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
      ignoreWarnings: [
        // CRA 5 has issues with source map.
        // https://github.com/facebook/create-react-app/discussions/11767
        // This solution will exclude those warnings. The app will
        // continue to build successfully.
        function ignoreSourcemapsloaderWarnings(warning: any) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ],
    },
  },
};
