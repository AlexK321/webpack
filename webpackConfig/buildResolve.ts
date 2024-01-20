import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";

export const buildResolve = (options: IWebpackOptions): webpack.Configuration['resolve'] => {

	return {
		extensions: [".tsx", ".ts", ".js"],
	}
}
