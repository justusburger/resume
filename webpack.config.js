const webpack = require('webpack');
const validate = require('webpack-validator');
const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const PATHS = {
  src: path.join(__dirname, 'src'),
  app: path.join(__dirname, 'src/index.js'),
  index: path.join(__dirname, 'src/index.html'),
  public: path.join(__dirname, 'public'),
  nodeModules: path.join(__dirname, 'node_modules'),
  styles: [
    path.join(__dirname, 'src/styles/base.scss')
  ]
};

let common = {
  entry: {
    app: PATHS.app,
    styles: PATHS.styles
  },
  output: {
    path: PATHS.public,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.html$/, loaders: ['html']}
    ]
  },
  postcss: function () {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.index
    })
  ]
};

var config;

switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, require('./webpack.config.production')(PATHS));
    break;
  default:
    config = merge(common, require('./webpack.config.development')(PATHS));
}

module.exports = validate(config);