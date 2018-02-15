/* eslint-env node */
const {resolve, join} = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const webpackconfig = {
  context: join(__dirname, '../src'),
  entry: ['./js/index.js'],
  output: {
    path: resolve(__dirname, '../build'),
    filename: 'app-[hash:6].js',
  },

  module: {
    rules: [{
      test: /\.(js)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    ]},

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      process.env.NODE_PATH || 'node_modules',
    ],
  },

  node: {
    console: false,
    fs: 'empty',
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // new CopyWebpackPlugin([
    //   {from: 'images', to: '.'},
    // ], {
    //   copyUnmodified: true,
    // }),
    new HtmlWebpackPlugin({
      template: './webpack-index.html',
      filename: 'index.html',
      environment: 'production',
    }),
  ],
}

module.exports = webpackconfig
