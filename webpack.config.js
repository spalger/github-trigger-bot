const { resolve } = require('path')

module.exports = {
  context: resolve(__dirname, 'dist'),
  entry: {
    'github-events': './github-events/bundle/index.js',
  },
  output: {
    path: resolve(__dirname, 'dist/bundles/'),
    filename: '[name].js',
  },
}
