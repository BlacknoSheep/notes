const express = require("express");

// 创建服务器的实例
const app = express();

/*
    目前，修改服务器代码后必须要重启服务器才能生效
    可以使用 nodemon 模块来实现自动重启服务器
        1. 全局安装
            npm i nodemon -g
        2.在项目中安装
            npm i nodemon -D
                -D 表示安装的是开发依赖，在 package.json 中会作为 devDependencies 的属性

        - 启动：
            nodemon     运行 index.js
            nodemon xxx.js    运行指定的 js
*/

// 配置路由
app.get("/hello", (req, res) => {
  console.log("hello路由被访问了~");
  res.send("这是hello路由！");
});

// 启动服务器
app.listen(3000, () => {
  console.log("服务器已启动！");
});
