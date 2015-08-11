var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),

    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    loaders:[{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './template.html'),
      inject: 'body'
    })
  ]
};

module.exports = config;
