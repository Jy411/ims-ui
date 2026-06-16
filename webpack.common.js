const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./js/index.js",
    dashboard: "./js/dashboard.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].bundle.js",
  },
};
