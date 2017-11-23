var webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "build");
const mainPath = path.resolve(__dirname, "src", "index.js");
const HTMLWebpackPlugin = require("html-webpack-plugin");

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + "/src/public/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  target: "web",
  entry: mainPath,
  output: {
    path: buildPath,
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2"]
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
};
