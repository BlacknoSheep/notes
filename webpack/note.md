# Webpack
- 使用步骤：
    1. 初始化项目 `pnpm init`
    2. 安装依赖 webpack 和 webpack-cli
    3. 默认入口点为 `./src/index.js`
    4. 执行 `pnpm webpack` 进行打包，默认输出为 `./dist/main.js`

## 配置文件
可在 `webpack.config.js` 文件中对 webpack 进行配置
```javascript
module.exports = {
  mode: "production",  // 模式
  entry: "./hello/hello.js",  // 入口点
  output: {
    path: path.resolve(__dirname, "./dist"), // 指定打包的目录，必须时绝对路径
    filename: "main.js", // 打包后的文件名
    clean: true, // 自动清理打包目录
  },
  module: {  // 设置 loader
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
    ],
  },
};
```

## 兼容性
- js 的新特性在旧浏览器中兼容性不好
- 可以通过一些工具将新代码转换为旧代码
- babel 可以将新的 js 语法转换为旧的 js，以提高代码的兼容性
- 如果希望在 webpack 支持 babel，则需要向 webpack 中引入 babel 的 loader
  1. 安装
  ```bash
  npm install -D babel-loader @babel/core @babel/preset-env
  ```
  2. 配置
  ```javascript
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
  ```
  3. 在 package.json 中设置兼容列表
  https://github.com/browserslist/browserslist
  ```json
  "browserlist":[
    "defaults"
  ]
  ```

## 插件（plugins）
插件可以用来扩展 webpack 的功能。  

**html-webpack-plugin**
- 可以自动在打包目录中生成 html 文件
  1. 安装依赖
  2. 配置插件（传入一个配置对象）
  ```javascript
  new HTMLPlugin({
      // title: "首页",
      template: "./src/index.html",
    }),
  ```

## 实时打包
```bash
pnpm webpack --watch  # 修改后自动进行打包
```
**开发服务器**
以服务器的形式运行，会自动刷新
```bash
pnpm add -D webpack-dev-server  # 安装
pnpm webpack serve  # 启动
pnpm webpack serve --open  # 启动并自动打开浏览器访问
```

## 调试
```javascript
devtool: "inline-source-map"  // 配置源码的映射
```

# Vite
- vite 也是前端构建工具
- vite 在开发时，不会对代码进行打包，而是直接采用 ESM 的方式来实时编译。
- 在项目部署时，再对项目进行打包
- vite 相对于 webpack 优势：速度快，使用简单。
- 安装和运行
```bash
pnpm add vite  # 安装
pnpm vite  # 运行，默认入口文件为 ./index.html。会实时更新
```
注：需要设置 `type="module"` 才能使用 ESM
```html
<script type="module" defer src="./src/index.js"></script>
```

- 打包
```bash
pnpm vite build
```
打包后的 html 文件中也有 `type="module"` ，需要使用服务器才能正常运行。可以使用：
```bash
pnpm vite preview  # 预览打包后的代码
```

- 使用命令直接构建项目
```bash
pnpm create vite
```

- 配置文件（./vite.config.js）
注意：vite 使用的是 ES 模块化
```javascript
// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'  // 提供代码提示

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})

```

- 兼容性插件
```bash
pnpm add -D @vitejs/plugin-legacy terser
```
