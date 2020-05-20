const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "./build"),
        publicPath: "./"
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyJSPlugin({
    //             sourceMap: false,
    //             uglifyOptions: {
    //                 compress: {
    //                     drop_console: true
    //                 }
    //             }
    //         })
    //     ]
    // },
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: { drop_console: true },
              mangle: true, // Note `mangle.properties` is `false` by default.
              module: false,
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_classnames: undefined,
              keep_fnames: false,
              safari10: false,
            },
          }),
        ],
      },
    plugins: [
        new webpack.DefinePlugin({
            // ...JSON.stringify(process.env),
            "process.env.google_map_key": JSON.stringify(process.env.google_map_key),
            "process.env.client_id": JSON.stringify(process.env.client_id),
            "process.env.client_secret": JSON.stringify(process.env.client_secret),
            "process.env.HOST": JSON.stringify(process.env.HOST),
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, ".", "./public/index.html"),
            filename: path.join(__dirname, "./build/index.html"),
            title: "Social Network"
        }),

    ]
});