const path = require("path");

module.exports = (env) => ({
  // в зависимости от режима 'development'' или ''production'' будет по разному запускаться сборка. Для прода билд будет максимально минифицирован
  mode: env.mode,
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    // статическое имя файла
    // filename: "main.js",
    filename: "[name].[contenthash].js", // динамическое имя файла
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
});
