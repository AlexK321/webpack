import webpack, { runtime } from "webpack";
import { IWebpackOptions } from "../webpack.config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildLoaders = (options: IWebpackOptions): webpack.Configuration['module'] => {
	const isDev = options.mode === 'development';

  return {
    // лоадеры
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          // для примера вынес эти настройки в babel.config.json. Хотя можно и сдесь
          // options: {
          //   // необходимые пресеты для корректной работы с TS и React
          //   presets: [
          //     '@babel/preset-env',
          //     '@babel/preset-typescript',
          //     ['@babel/preset-react', {runtime: 'automatic'}]
          //   ]
          // }
        }
      },
      // вместо ts-loader подключил babel-loader выше
			// {
			// 	test: /\.tsx?$/,
			// 	use: "ts-loader",
			// 	exclude: /node_modules/,
			// },
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
          "sass-loader",
        ],
			},
      // лоадер обработки картинок
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // лоадер шрифтов
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // лоадер svg
      // при использовании этого лоадера иконка может импортироваться сразу как компонента
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              // опция нужна для того что бы при передаче иконки размеров менялся не только сам ее контейнер, а вся иконка
              icon: true,
            },
          },
        ],
      }
    ],
	}
};




