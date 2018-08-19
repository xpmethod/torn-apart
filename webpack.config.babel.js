import { resolve } from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";
// import CompressionPlugin from "compression-webpack-plugin";


const context = resolve(__dirname, "src");
const out = resolve(__dirname, "docs", "assets", "js");

export default {
  mode: "development",
  context,
  entry: {
    i18n: "./i18n.js",
    allies: "./allies.js",
    texturesV1: "./textures-v1.js",
    visualizationsV1: "./visualizations-v1.js",
    indexV1: "./index-v1.js",
    texturesV2: "./textures-v2.js",
    visualizationsV2: "./visualizations-v2.js",
    indexV2: "./index-v2.js",
    reflections: "./reflections.js"
  },
  output: {
    filename: "[name].bundle.js",
    // chunkFilename: "[name].bundle.js",
    path: out,
    libraryTarget: "umd",
    library: "tornApart",
    publicPath: "/torn-apart/assets/js/"
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
  // optimization: {
  //   // chunks: "all"
  //   splitChunks: {
  //     cacheGroups: {
  //       default: false,
  //       vendors: false,
  //       vendor: {
  //         name: "vendor",
  //         chunks: "all",
  //         test: /node_modules/
  //       }
  //     }
  //   }
  // },
  externals: {
    jquery: "jQuery",
    leaflet: "L"
  },
  plugins: [
    new CleanWebpackPlugin([out]),
    // new CompressionPlugin({
    //   cache: true,
    //   test: /\.js/,
    // }),
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
