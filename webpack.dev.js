var webpack = require('webpack');
module.exports = {
  entry: {
    bundle: './index',
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};