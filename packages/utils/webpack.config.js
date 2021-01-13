const path = require("path");

module.exports = {
  target: "web",
  mode: "development",
  entry: "./src/index.ts",
  devtool: "source-map",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    // libraryTarget: "module",
  },
  experiments: {
    // outputModule: true,
    // syncWebAssembly: true,
    // topLevelAwait: true,
    // asyncWebAssembly: true,
    // layers: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ["css-loader", "less-loader"], // compiles Less to CSS
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".json"],
    symlinks: true,
  },
};
