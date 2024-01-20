import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";
import { buildResolve } from "./buildResolve";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
// не удалять его!
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export const buildWebpack = (options: IWebpackOptions): webpack.Configuration => {

  const config: webpack.Configuration = {
    // в зависимости от режима 'development'' или ''production'' будет по разному запускаться сборка. Для прода билд будет максимально минифицирован
    mode: options.mode,
    //точка входа js, ts, tsx, jsx
    entry: options.path.entry,
    // точка выхода в билде
    output: {
      filename: "[name].[contenthash].js", // динамическое имя файла
      path: options.path.output,
      clean: true,
    },
    // все основные преобразования фаилов происходят в plugins и module
    // при добавлении плагина по условию при негативном исходе возвращать false !!!
    plugins: buildPlugins(options),
    // все основные преобразования фаилов происходят в plugins и module
    // при добавлении плагина по условию при негативном исходе возвращать undefined !!!
    module: buildLoaders(options),
    // упрощения при исмпорте в модулях в коде. При импорте переменной в фаил и указании пути можно не указывать расширение фаила
    // и вебпак будет сам искать это расширение исходя из нижеприведенных
    // пример: import { a } from './src/file'; => import { a } from './src/file.ts';
    resolve: buildResolve(options),
    // инструмент для отслеживания ошибок. При сборке бандла вебпак создает один js фаила. При возникновении ошибки понять ее реальное местоположение в коде
    // очень сложно. В данном случае плагин отслеживает ошибки и показывает из как-буд то бы они возникли в исходном коде.
    devtool: "inline-source-map",
    // пересборка проекта в дев режиме при каждом изменении фаила
    devServer: buildDevServer(options),
  };

  return config;
}
