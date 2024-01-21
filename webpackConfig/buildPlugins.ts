import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export const buildPlugins = (options: IWebpackOptions): webpack.Configuration['plugins'] => {
  const isDev = options.mode === 'development';

  return [
    // плагин для сборки html-файла и добавления в него скрипта из index.js
    new HtmlWebpackPlugin({
      // конфигурация плагина  указываем пример на основании которого будет создаваться html-файл
      template: options.path.html,
    }),
    // плагин для отображения прогресса (процента выполнения) сборки - желательно не исользовать в проде
    new webpack.ProgressPlugin(),
    // плагин минификации и выноса стилей в отдельный фаил
    new MiniCssExtractPlugin({
      // Настройки плагина в каком виде сохранять (необязательно) и т д
      filename: "./css/[name].css",
      chunkFilename: "[id].css",
    }),
    // при сборке билда открывается страница в браузере, где видны размеры составляющих папок и фаилов бандла
    // добавил кастомный флаг isAnalyze, по которому из скрипта определять открывать аналайзер или нет
    (!isDev && options.isAnalyze) ? new BundleAnalyzerPlugin() : false,
    // реализация tree shaking. При отрисовке по этой переменной если она false вебпак может полностью вырезать
    // из бандла зависимую часть кода (нужно декларировать эти переменные в global.d.ts)
    new webpack.DefinePlugin({
      __BROWSER_SUPPORTS_HTML5: true,
    }),
    // этот плагин выносит проверку типизации в отдельный поток, за счет чего ускоряет саму сборку проекта вебпаком
    new ForkTsCheckerWebpackPlugin(),
    // плагин для дев режима и реакта, что бы при изменении фаила вебпак не перезагружал страницу, а обновлял ту же
    isDev ? new ReactRefreshWebpackPlugin() : false,
  ]
};




