var webpack = require('webpack')

module.exports = {
  // configuration
  entry: ['babel-polyfill', './client/js/index'],
  output: {
    path: __dirname + '/client/build',
    publicPath: '/client/build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  devServer: {
    // contentBase: __dirname + '/client'
  },
  devtool: 'sourcemap'
};
