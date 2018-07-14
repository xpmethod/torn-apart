import { resolve } from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";

const context = resolve(__dirname, "src");
const out = resolve(__dirname, "docs", "assets", "js");

export default {
  mode: "development",
  context,
  entry: {
    i18n: "./i18n.js",
    textures: "./textures.js",
    visualizations: "./visualizations.js",
    index: "./index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: out,
    libraryTarget: "umd",
    library: "tornApart",
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
  externals: {
    jquery: "jQuery",
    leaflet: "L"
  },
  plugins: [
    new CleanWebpackPlugin([out]),
  ],
  module: {
    rules: [
      {
        test: /\.csv$/,
        loader: "csv-loader",
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true 
        }
      }
    ]
  }
};
