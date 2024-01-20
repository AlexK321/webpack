import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";

export const buildDevServer = (options: IWebpackOptions): webpack.Configuration['devServer'] => {

  return {
      static: options.path.output,
      port: options.port || 3000,
      hot: true,
    }
};
