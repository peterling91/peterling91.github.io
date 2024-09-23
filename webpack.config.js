const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  entry: {
    index: ["./src/js/index.ts"],
    sustainability: ["./src/js/sustainability.ts"],
  },
  devtool: "source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  // devServer: {
  //   static: path.resolve(__dirname, "dist"),
  //   port: 8080,
  //   hot: true,
  // },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    // splitChunks: {
    //   chunks: "async",
    // },
  },
  // stats: 'verbose', // Enable verbose logging
};
