import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildPlugins = (options: IWebpackOptions): webpack.Configuration['plugins'] => {

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
    })
  ]
};




