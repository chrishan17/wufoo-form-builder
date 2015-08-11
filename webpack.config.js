var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app')
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template.html'),
      inject: 'body',
      dev: 'http://localhost:8080/webpack-dev-server.js'
    })
  ]
};
