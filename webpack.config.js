var webpack = require('webpack')
var path = require('path')

module.exports = {
  // configuration
  entry: ['babel-polyfill', './client/js/index'],
  output: {
    path: path.resolve(__dirname, './client/build'),
    publicPath: '/',
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
