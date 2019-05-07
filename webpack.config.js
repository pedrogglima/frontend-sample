'use strict';

const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './app/index.ts',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: distDir,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
       test: /favicon\.png$/,
       use: 'file-loader?name=[name].[ext]',
     },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'rontend',
      favicon: 'app/assets/images/favicon-16x16.png'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    // new BundleAnalyzerPlugin(), // uncomment for using plugin
    new CompressionPlugin()
  ],
};
