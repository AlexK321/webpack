import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";
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
				use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // включаем возможность использованию module CSS то есть хешированные стили у fileName.module.scss
              modules: {
                // задаю имя для дев и прод сборки
                localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:5]",
              },
            },
          },
          "sass-loader"
        ],
			},
    ],
	}
};




