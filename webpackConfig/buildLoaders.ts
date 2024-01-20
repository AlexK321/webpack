import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildLoaders = (options: IWebpackOptions): webpack.Configuration['module'] => {
	const isDev = options.mode === 'development';

  return {
    // лоадеры
    rules: [
			{
				//регулярное вырожение для выборки фаилов
				test: /\.tsx?$/,
				// какой лоадер использовать
				use: "ts-loader",
				// исключаем папку node_modules
				exclude: /node_modules/,
			},
			{
				test: /\.s[ac]ss$/i,
				// не забывать про порядок. Выполняется с конца в начало
				use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
    ],
	}
};
 



