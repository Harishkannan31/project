const path = require('path');

module.exports = {
  // Other webpack configuration options...
  resolve: {
    fallback: {
      "fs": false,
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      // Add other fallbacks as needed
    }
  }
};
