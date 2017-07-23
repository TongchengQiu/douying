'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var outputDir = './public';

var templateContentString =
'<!DOCTYPE html>'+
'<html>'+
  '<head>'+
    '<meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
    '<meta content="yes" name="apple-mobile-web-app-capable">'+
    '<meta content="black" name="apple-mobile-web-app-status-bar-style">'+
    '<meta content="telephone=no" name="format-detection">'+
    '<meta content="email=no" name="format-detection">'+
    '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">'+
    '<meta name="description" content="node">'+
    '<meta name="keywords" content="node">'+
    '<meta name="author" content="qiutc, tongchengqiu@gmail.com">'+
    '<title>{%= o.htmlWebpackPlugin.options.title %}</title>'+
  '</head>'+
  '<body>'+
    '<div id="wrap"></div>'+
  '</body>'+
'</html>'
;

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'js/commons.js',
  }),
  new webpack.ProvidePlugin({
    React: 'react',
    ReactDOM: 'react-dom',
    reqwest: 'reqwest',
    ReactRouter: 'react-router',
  }),
  new HtmlWebpackPlugin({
    title: 'DBmovie',
    filename: '../views/index.html',
    inject: 'body',
    templateContent: templateContentString,
  }),
];

var config = {
  entry: {
    main: './src/Main.jsx',
  },
  output: {
    path: path.join(__dirname, outputDir),
    filename: 'js/[name].bundle.js',
    publicPath: 'http://localhost:3000/',
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel?presets[]=es2015&presets[]=react',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?root='+__dirname, 'resolve-url', 'sass'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url?limit=1000&name=img/[name].[ext]'
      },
      {
        test: /\.(woff2?|otf|eot|svg|ttf)$/i,
        loader: 'url?name=fonts/[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'file?name=../views/[name].[ext]'
      },
    ],
  },
  plugins: plugins,
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'source-map',
};

module.exports = config;
