const webpack = require("webpack");
const path = require("path");
require("@babel/polyfill");
require('dotenv').config()

module.exports = {
  entry: ["@babel/polyfill", "./index.js"],
  output: {
      filename: "bundle.js",
      path: path.join(__dirname, "./build"),
      publicPath: "/"
  },
  module: {
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
      // {
      //   test: /\.svg$/,
      //   loader: "svg-inline-loader"
      // },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            mimetype: 'image/png',
          },
        },
      },
      {
        test: /\.html$/,
        use: [ {
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

