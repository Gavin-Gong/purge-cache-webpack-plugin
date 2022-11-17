const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PurgeCacheWebpackPlugin = require("../lib");
const isProduction = process.env.NODE_ENV == "production";

/** @type {import('webpack').Configuration}*/
const config = {
  cache: {
    type: "filesystem",
    maxAge: 1000 * 60,
    cacheDirectory: path.resolve("./", ".cache"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new PurgeCacheWebpackPlugin(),
  ],
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  infrastructureLogging: {
    debug: /webpack\.cache/,
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
