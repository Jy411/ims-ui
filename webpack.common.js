const path = require("path");

module.exports = {
  entry: {
    app: "./js/index.js",
    dashboard: "./js/dashboard.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].[contenthash].bundle.js",
  },
};
