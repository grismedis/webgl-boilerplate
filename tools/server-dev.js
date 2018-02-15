/* eslint-env node */

const webpack = require('webpack')
const WebpackDev = require('webpack-dev-server')
const path = require('path')
const PORT = 3000

const webpackConfig = require('./webpack.config.js')

// overwrite entries/output (ugly but just werks and did not find any better)
webpackConfig.entry = path.join(__dirname, '../src/index.js')
webpackConfig.output.path = path.join(__dirname, '../build')
webpackConfig.output.filename = 'app-[hash:6].js'

const libCompiler = webpack(webpackConfig)

const devServer = new WebpackDev(libCompiler, {
  contentBase: path.join(__dirname, '../build'),
  compress: false,
})

devServer.listen(PORT, '0.0.0.0', function() {
  /* eslint-disable no-console */
  console.log('Starting lib server on http://0.0.0.0:3000')
  /* eslint-enable no-console */
})