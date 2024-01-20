import path from "path";
import { buildWebpack } from "./webpackConfig/buildWebpack";

interface IEnv {
  mode: "production" | "development";
  port: number;
  isAnalyze: boolean;
}

export interface IWebpackOptions extends IEnv {
  path: {
    entry: string;
    output: string;
    html: string;
    src: string;
  };
}

export default (env: IEnv) => {
  const configOptions = {
    path: {
      entry: path.resolve(__dirname, "src", "index.tsx"),
      output: path.resolve(__dirname, "build"),
      html: path.resolve(__dirname, "public", "index.html"),
      src: path.resolve(__dirname, "src"),
    },
    mode: env.mode,
    port: env.port,
    isAnalyze: env.isAnalyze || false,
  };

  const config = buildWebpack(configOptions);

  return config;
};
