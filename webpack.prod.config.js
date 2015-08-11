var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, 'app/main.js'),
    vendors: ['react, react-bootstrap']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders:[{
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, 'app')
    },{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.(png|jpg|git|woff|woff2|ttf|eot|svg)$/,
      loader: 'url?limit=10000'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/template.html'),
      inject: 'body'
    })
  ]
};
