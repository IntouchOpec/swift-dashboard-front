const webpack = require("webpack");
const path = require("path");
require("@babel/polyfill");
require('dotenv').config()
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "./css/main.css"
});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "./build"),
    publicPath: "/"
  },
  module: {
    // strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx?)$/, ///\.(js|jsx)$/
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["last 2 versions"]
                },
                modules: false
              }
            ],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.(css)$/,
        // exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].blocks.css',
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader?-url'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=[name].[ext]&publicPath=./&outputPath=./images/',
          'image-webpack-loader'
        ]
      },
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       mimetype: 'image/png',
      //     },
      //   },
      // },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }],
      }
    ]
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "./src")]
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
    new webpack.ProgressPlugin()
  ]
}

