module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve('buffer/'),
    events: require.resolve('events/'),
  };

  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Critical dependency: the request of a dependency is an expression/,
  ];

  return config;
};
