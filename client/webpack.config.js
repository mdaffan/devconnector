const path = require('path')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
let k = path.resolve(__dirname, '../client/src/Components/common/source.gif')
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
      },
      {
        test: /\.(png|jpg|gif)$/i,

        use: [
          {
            loader: 'url-loader?name=./../src/Components/common[name].[ext]',
            options: {}
          }
        ]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/',
    historyApiFallback: true
  }
}
