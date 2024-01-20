import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildWebpack } from "./webpackConfig/buildWebpack";

interface IEnv {
  mode: "production" | "development";
  port: number;
}

export interface IWebpackOptions {
  path: {
    entry: string;
    output: string;
    html: string;
  };
  port: number;
  mode: "production" | "development";
}

export default (env: IEnv) => {
  const configOptions = {
    path: {
      entry: path.resolve(__dirname, "src", "index.tsx"),
      output: path.resolve(__dirname, "build"),
      html: path.resolve(__dirname, "public", "index.html"),
    },
    mode: env.mode,
    port: env.port
  };

  const config = buildWebpack(configOptions);

  return config;
};
