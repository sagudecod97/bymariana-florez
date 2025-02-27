const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { index: "./index.js", aboutMe: "./about-me.js" },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      // SASS/SCSS Loader
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // Image Loader
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", // Handles image assets
      },
      // Font Loader
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/i,
        type: "asset/resource", // Handles font files
        generator: {
          filename: "fonts/[name][ext]", // Output fonts in a "fonts" folder
        },
      },
      // HTML Loader
      {
        test: /\.html$/,
        use: ["html-loader"], // Handles HTML imports
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Source HTML -
    }),
    new HtmlWebpackPlugin({
      filename: "about-me.html",
      template: "./about-me.html",
      chunks: ["aboutMe"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css", // ✅ Output CSS file
    }),
  ],
  devServer: {
    static: "./dist",
    port: 3000, // Dev server port
    open: true,
    hot: true, // Enable Hot Module Replacement
  },
  mode: "development", // or 'production'
};
