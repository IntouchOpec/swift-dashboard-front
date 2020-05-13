const path = require("path");

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push(
    {
      test: /\.css$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader" // translates CSS into CommonJS
      ]
    },
    {
      test: /\.scss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    }
  );

  // if(typeof storybookBaseConfig.resolve.modules !== 'object'){
  //   storybookBaseConfig.resolve.modules = [];
  // }
  storybookBaseConfig.resolve.modules.push(path.resolve(__dirname, "../../src"));
  return storybookBaseConfig;
};