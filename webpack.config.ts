import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

interface IEnv {
  mode: "production" | "development";
  port: number;
}

export default (env: IEnv) => {
  const config: webpack.Configuration = {
    // в зависимости от режима 'development'' или ''production'' будет по разному запускаться сборка. Для прода билд будет максимально минифицирован
    mode: env.mode,
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
      // статическое имя файла
      // filename: "main.js",
      filename: "[name].[contenthash].js", // динамическое имя файла
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    plugins: [
      // плагин для сборки html-файла и добавления в него скрипта из index.js
      new HtmlWebpackPlugin({
        // конфигурация плагина  указываем пример на основании которого будет создаваться html-файл
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      // плагин для отображения прогресса (процента выполнения) сборки - желательно не исользовать в проде
      new webpack.ProgressPlugin(),
    ],
    module: {
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
      ],
    },
    // упрощения при исмпорте в модулях в коде. При импорте переменной в фаил и указании пути можно не указывать расширение фаила
    // и вебпак будет сам искать это расширение исходя из нижеприведенных
    // пример: import { a } from './src/file'; => import { a } from './src/file.ts';
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    // инструмент для отслеживания ошибок. При сборке бандла вебпак создает один js фаила. При возникновении ошибки понять ее реальное местоположение в коде
    // очень сложно. В данном случае плагин отслеживает ошибки в js фаилах и показывает их в консоли
    devtool: "inline-source-map",
    // пересборка проекта в дев режиме при каждом изменении фаила
    devServer: {
      static: path.resolve(__dirname, "build"),
      port: env.port || 3000,
      hot: true,
    },
  };

  return config;
};
