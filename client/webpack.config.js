const path = require('path')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src'],
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',

          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-class-properties'],
              [new ErrorOverlayPlugin()]
            ]
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/',
    historyApiFallback: true
  }
}
