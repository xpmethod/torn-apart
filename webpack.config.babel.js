import { resolve } from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";

const context = resolve(__dirname, "src");
const out = resolve(__dirname, "docs", "assets", "js");

export default {
  mode: "development",
  context,
  entry: {
    i18n: "./i18n.js",
    texturesV1: "./textures-v1.js",
    visualizationsV1: "./visualizations-v1.js",
    indexV1: "./index-v1.js",
    texturesV2: "./textures-v2.js",
    visualizationsV2: "./visualizations-v2.js",
    indexV2: "./index-v2.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: out,
    libraryTarget: "umd",
    library: "tornApart",
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
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
