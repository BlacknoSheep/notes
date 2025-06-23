// const path = require("node:path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = {
  // 设置打包模式，production：生产模式；development：开发模式
  mode: "development",

  // 入口文件路径，用来指定打包时的主文件，默认：./src/index.js
  // entry: "./hello/hello.js",\
  // 可以传一个数组，可以将多个文件打包为一个文件（即使没有调用关系）
  // entry: ["./src/a.js", "./src/b.js"],
  // 可以传一个对象，表示分别打包为多个文件
  // entry: {
  //   hello: "./src/a.js", // 生成 ./dist/hello.js
  //   hhh: "./src/b.js", // 生成 ./dist/hhh.js
  // },

  // 配置打包后的文件的输出地址
  output: {
    // path: path.resolve(__dirname, "./dist"), // 指定打包的目录，必须时绝对路径
    // filename: "main.js", // 打包后的文件名
    clean: true, // 自动清理打包目录
  },

  /*
    webpack 默认只会处理 js 文件，如果要处理其他类型的文件，则需要为其引入 loader
    
    以 css 为例：
      1. 安装 css-loader
        pnpm add -D css-loader
      2. 配置 css-loader
    注意：css-loader 只负责将 css 打包为 js 代码，不负责使其在页面中生效。
      要使得样式生效，还需要安装 style-loader
  */
  module: {
    rules: [
      // { test: /\.css$/, use: "css-loader" }, // 使用 css-loader 处理 .css 结尾的文件
      { test: /\.css$/i, use: ["style-loader", "css-loader"] }, // loader 从后往前执行，所以 style-loader 需要写在前面

      // 图片 loader
      { test: /\.(jpg|png|gif)/i, type: "asset/resource" },
    ],
  },

  // 设置插件
  plugins: [
    // 自动生成html页面
    new HTMLPlugin({
      // title: "首页",
      template: "./src/index.html",
    }),
  ],

  devtool: "inline-source-map",
};
