require('dotenv').config({ path: 'variables.env' });
const path = require('path');
const webpack = require('webpack');

const javascript = {
  test: /\.(js)$/, 
  use: [{
    loader: 'babel-loader',
    options: { presets: ['es2015', 'react', 'stage-2'] }
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
    App: './client/index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
      AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
      AUTH_CALLBACK_URL: JSON.stringify(process.env.AUTH_CALLBACK_URL),
      "process.env.AUTH_DOMAIN": JSON.stringify(process.env.AUTH_DOMAIN),
      "process.env.AUTH_CLIENT_ID": JSON.stringify(process.env.AUTH_CLIENT_ID),
      "process.env.AUTH_CALLBACK_URL": JSON.stringify(process.env.AUTH_CALLBACK_URL)
    })
  ],
  module: {
    rules: [javascript, svg]
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './client/services/api'),
      '@scenes': path.resolve(__dirname, './client/scenes')
    }
  }
};

process.noDeprecation = true;

module.exports = config;