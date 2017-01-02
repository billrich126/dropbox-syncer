var gulp = require('gulp')
var gutil = require('gulp-util')

var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js')

gulp.task('default', ['webpack-dev-server'])

// [ dev server ]
gulp.task('webpack-dev-server', function(callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  new webpackDevServer(webpack(myConfig), {
    publicPath: myConfig.output.publicPath,
    inline: true,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
})

// [ dev build ]
var devConfig = Object.create(webpackConfig)
devConfig.devTool = 'sourcemap'
devConfig.debug = true

var devCompiler = webpack(devConfig)            // caching
gulp.task('webpack:build-dev', function(cb) {
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build-dev', err)
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }))
    cb()
  })
})

// [ prod build ]
gulp.task('webpack:build', function(cb) {
  var prodConfig = Object.create(webpackConfig)
  prodConfig.plugins = (prodConfig.plugins || []).concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  )

  webpack(prodConfig, function(err, stats) {
    if(err) throw new  gutil.PluginError('webpack:build-dev', err)
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }))
    cb()
  })
})
