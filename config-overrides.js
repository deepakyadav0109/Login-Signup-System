const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "process": require.resolve("process/browser"),
    "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      'process/browser': require.resolve('process/browser'),
      "fs": false,
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  );

  return config;
};