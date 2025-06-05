# 一、准备

## 1. 安装 

安装webpack 和webpack命令行

```bash
pnpm install webpack webpack-cli -D
```

安装自动生成html文件的插件

```bash
pnpm install html-webpack-plugin -D
```

安装webpack服务器

```bash
pnpm install webpack-dev-server -D
```

## 2. 配置

### 2.1 在 `package.json` 中加入快捷命令

```json
"scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack --mode development" // --mode [mode] 可以指定 development或production模式
  },
```

### 2.2 在 `webpack.config.js` 中进行配置

```javascript
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

// esm规范下没有__dirname和__filename，可以通过 import.meta.url 获取当前文件的绝对路径
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 提供类型提示
/** 
 * @type {import("webpack").Configuration}
 */

export default {
  mode: "development",
  entry: "./src/index.ts", // 入口文件
  output: {
    filename: "index.js", // 打包后的文件名，[fullhash]是webpack内置的变量，表示每次打包后的hash值
    path: path.resolve(__dirname, "dist"), // 打包后的目录
    clean: true, // 打包前清空dist目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // 指定模板文件
    }),
  ],
};
```

### 2.3 配置 `tsconfig.json` 

```json
{
  "compilerOptions": {
    "module": "ESNext", // ts 文件中使用的模块化方案
    "target": "ESNext", // 编译后生成的js文件应该使用哪个版本
    "esModuleInterop": true, // 对接不同的模块化方案，使得在es6模块中能够像导入es6模块一样导入commonjs模块
    "lib": ["ESNext", "DOM", "DOM.Iterable"], // 指定编译过程中需要引入的库文件或类型声明文件，用于提供类型检查等功能
    "skipLibCheck": true, // 编译时跳过对声明文件（.d.ts）的检查
    "sourceMap": false, // 是否生成sourceMap文件，用于调试ts文件
    "importHelpers": true, // 减少因ts自动生成的辅助代码导致的重复

    // 如果不配置moduleResolution，那么在使用import导入文件时，会报错：无法找到模块
    "moduleResolution": "Bundler", // 模块解析策略，配合打包工具时用Bundler
    "isolatedModules": true, // 将每个ts文件作为单独的模块，不会在全局作用域添加任何内容

    "strict": true,

    "baseUrl": "./", // ts文件中使用的路径别名的基础路径
    "paths": {
      // ts文件中使用的路径别名
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"]
}
```

### 2.4 支持vue

安装 vue

```bash
pnpm install vue
```

为webpack安装解析vue文件的插件，https://vue-loader.vuejs.org/zh/guide/#vue-cli

```bash
pnpm install -D vue-loader vue-template-compiler
```

配置插件

```javascript
// webpack.config.js
import { VueLoaderPlugin } from "vue-loader";
// ...

export default {
  // ...
  module: {
    rules: [
      {
        test: /\.vue$/, // 所有 .vue 文件
        // 一个loader用loader，多个用use
        loader: "vue-loader", // 使用 vue-loader 进行解析
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // ...
  ],
};
```

配置路径别名和省略后缀名

```javascript
export default {
  // ...
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // extensions: [".js", ".ts", ".vue"], // import时尝试自动补全文件后缀
  },
};
```

设置 [Feature Flags](https://github.com/vuejs/core/tree/main/packages/vue#bundler-build-feature-flags) 

```javascript
// webpack.config.js
// webpack是CommonJS规范，直接使用 import { DefinePlugin } from "webpack"; 会报错
import webpack from "webpack";
const { DefinePlugin } = webpack;

// 在 export default 中添加
plugins: [
  // ...
  
  new DefinePlugin({
    __VUE_OPTIONS_API__: false, // 是否启用选项式api（vue2）
    __VUE_PROD_DEVTOOLS__: false, // 是否在生产环境下支持devtools
  }),
],
```

### 2.5 支持css

安装用于解析css的 `css-loader` 和用于将 css 插入到 DOM 中的 `style-loader` 

```bash
pnpm install -D css-loader style-loader
```

配置

```javascript
// webpack.config.js
export default {
  // ...

  module: {
    // rules 从下到上执行
    rules: [
      // ...
      
      {
        test: /\.css$/, // 所有css文件
        use: ["style-loader", "css-loader"], // 从右向左执行
      },
    ],
  }
};
```

### 2.6 支持sass

安装 sass 和 sass 解析器

```bash
pnpm install -D sass sass-loader
```

配置

```javascript
rules: [
  {
    test: /\.scss$/, // 所有scss文件
    use: ["style-loader", "css-loader", "sass-loader"],
  },
],
```

### 2.7 支持 typescript 

安装 typescript 和 typescript 解析器

```bash
pnpm install -D typescript ts-loader
```

配置

```javascript
{
  test: /\.ts/, // 所有 ts 文件
  loader: "ts-loader",
  options: {
    configFile: path.resolve(process.cwd(), "tsconfig.json"), // 指定ts配置文件
    appendTsSuffixTo: [/\.vue$/], // 给vue文件添加ts后缀，让vue文件也能使用ts
  },
},
```

为了让ts识别 vue 后缀，需要在 index.ts同级目录下创建声明文件 xxx.d.ts

<span style="color:red">注意：不要和其他 ts 文件同名，否则会报错（如不要同时存在 index.ts 和 index.d.tsf）</span>

```typescript
// shims.d.ts
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```

### 2.8 美化 webpack-server 的输出

```bash
pnpm install -D friendly-errors-webpack-plugin
```

```javascript
// webpack.config.js
plugins: [
  // ...
  
  new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
      messages: ["You application is running here http://localhost:8080"],
    },
  }),
],
stats: "errors-only", // 终端仅打印error
devServer: {
  port: 8080, // 启动端口
  open: true, // 自动打开浏览器
  hot: true, // 开启热更新
  client: {
    logging: "warn", // 关闭热更新时控制台的打印信息
  },
},
```

### 2.9 使用 CDN 引入以减小打包后的文件体积

```javascript
// webpack.config.js
export default {
  // ...
  externals: {
    // 配置不打包的模块（可以转而使用cdn引入）
    vue: "Vue",
  },
};
```

```html
<!-- index.html -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

