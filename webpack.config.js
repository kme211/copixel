require("dotenv").config({ path: "variables.env" });
const path = require("path");
const webpack = require("webpack");

const javascript = {
  test: /\.(js)$/,
  use: [
    "babel-loader"
  ],
  exclude: /node_modules/
};

const svg = {
  test: /\.svg$/,
  use: ["raw-loader"]
};

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
    app: [
      "react-hot-loader/patch",
      "webpack-hot-middleware/client?reload=true/__webpack_hmr",
      "./client/index.js"
    ]
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "/",
    filename: "[name].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.AUTH_DOMAIN": JSON.stringify(process.env.AUTH_DOMAIN),
      "process.env.AUTH_CLIENT_ID": JSON.stringify(process.env.AUTH_CLIENT_ID),
      "process.env.AUTH_CALLBACK_URL": JSON.stringify(
        process.env.AUTH_CALLBACK_URL
      )
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
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
      "@components": path.resolve(__dirname, "./client/components"),
      "@server": path.resolve(__dirname, "./server")
    }
  }
};

process.noDeprecation = true;

module.exports = config;
