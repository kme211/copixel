const path = require('path');
const webpack = require('webpack');

const javascript = {
  test: /\.(js)$/, 
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015', 'react'] }
  }],
};

const svg = {
  test:  /\.svg$/,
  use: [ 'raw-loader' ]
};

const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
});

const config = {
  entry: {
    // we only have 1 entry, but I've set it up for multiple in the future
    App: './src/javascripts/index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'src', 'public', 'js'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [javascript, svg]
  }
};

process.noDeprecation = true;

module.exports = config;