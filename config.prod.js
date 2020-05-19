const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./build"),
    publicPath: "./"
},
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: false,
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, ".", "./public/index.html"),
      filename: path.join(__dirname, "./build/index.html"),
      title: "Social Network"
    })
  ]
});