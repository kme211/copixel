require("dotenv").config({ path: "variables.env" });
const path = require("path");
const webpack = require("webpack");

const javascript = {
  test: /\.(js)$/,
  use: [
    {
      loader: "babel-loader",
      options: { presets: ["es2015", "react", "stage-2"] }
    }
  ]
};

const svg = {
  test: /\.svg$/,
  use: ["raw-loader"]
};

const uglify = new webpack.optimize.UglifyJsPlugin({
  // eslint-disable-line
  compress: { warnings: false }
});

const lint = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  enforce: "pre",
  use: [
    {
      loader: require.resolve("eslint-loader")
    }
  ]
};

const config = {
  entry: {
    // we only have 1 entry, but I've set it up for multiple in the future
    App: "./client/index.js"
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "js/[name].bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.AUTH_DOMAIN": JSON.stringify(process.env.AUTH_DOMAIN),
      "process.env.AUTH_CLIENT_ID": JSON.stringify(process.env.AUTH_CLIENT_ID),
      "process.env.AUTH_CALLBACK_URL": JSON.stringify(
        process.env.AUTH_CALLBACK_URL
      )
    })
  ],
  module: {
    rules: [lint, javascript, svg]
  },
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./client/api"),
      "@utils": path.resolve(__dirname, "./client/utils"),
      "@services": path.resolve(__dirname, "./client/services"),
      "@constants": path.resolve(__dirname, "./client/constants"),
      "@components": path.resolve(__dirname, "./client/components")
    }
  }
};

process.noDeprecation = true;

module.exports = config;
