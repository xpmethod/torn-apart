import { join } from "path";

const context = join(__dirname, "src");

export default {
  mode: "development",
  context,
  entry: {
    i18n: "./i18n.js",
    textures: "./textures.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: join(__dirname, "docs", "assets", "js"),
    libraryTarget: "umd",
    library: "tornApart",
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
  // },
  externals: {
    jquery: "jQuery"
  },
};
