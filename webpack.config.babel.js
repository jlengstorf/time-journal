const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

require('dotenv').config();

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-inline-source-map',
  context: path.join(__dirname, './app'),
  entry: {
    js: './js/app.js',
    vendor: ['react', 'react-dom', 'firebase', 'moment'],
  },
  output: {
    path: path.join(__dirname, './public'),
    filename: 'js/app.min.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
        // loader: ExtractTextPlugin.extract({
        //   fallbackLoader: "style-loader",
        //   loader: "style-loader!css-loader!postcss-loader?sourceMap",
        //   // publicPath: "./",
        // }),
      },
    ],
  },
  plugins: [
    // new ExtractTextPlugin('./css/[name].min.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: './js/vendor.bundle.js',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
        FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
  ],
  postcss: () => [
    require('postcss-import')(),
    require('postcss-nested'),
    require('postcss-each'),
    require('postcss-simple-vars'),
    require('postcss-cssnext')({ warnForDuplicates: false }),
    require('cssnano')(),
  ],
};
