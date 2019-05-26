const path = require('path')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
module.exports = env => {
  const isProduction = env === 'production'

  return {
    mode: 'development',
    entry: ['babel-polyfill', './src'],
    output: {
      path: path.resolve(__dirname, 'public/scripts'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },

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
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      publicPath: '/scripts/',
      historyApiFallback: true
    }
  }
}
