var webpack = require('webpack')

module.exports = {

  // configuration
  entry: ['babel-polyfill', './client/js/index'],
  output: {
    path: __dirname + '/client/dist',
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

  devtool: 'sourcemap'

};
