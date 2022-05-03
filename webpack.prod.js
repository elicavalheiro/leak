const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
      filename: '[name].[hash:20].js',
      path: buildPath
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env']
              }
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './index.html',
          inject: 'body',
      })
  ]
};