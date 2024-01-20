import webpack from "webpack";
import { IWebpackOptions } from "../webpack.config";

export const buildResolve = (options: IWebpackOptions): webpack.Configuration['resolve'] => {

	return {
    // упрощения при исмпорте в модулях в коде. При импорте переменной в фаил и указании пути можно не указывать расширение фаила
    // и вебпак будет сам искать это расширение исходя из нижеприведенных
    // пример: import { a } from './src/file'; => import { a } from './src/file.ts';
		extensions: [".tsx", ".ts", ".js"],
    // создание алиасов (для микрофронтов в основном - сокращенное написание части пути в импорте)
    alias: {
      '@': options.path.src
    }
	}
}
