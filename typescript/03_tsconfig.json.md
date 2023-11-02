常用配置：

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
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"],
  "exclude": ["node_modules"]
}
```

