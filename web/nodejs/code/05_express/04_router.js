const express = require("express");
const path = require("node:path");
const app = express();

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "./public")));
// 配置请求体解析
app.use(express.urlencoded());
// 配置模板引擎
app.set("view engine", "ejs");
// 配置模板路径
app.set("view", path.resolve(__dirname, "./views"));

/*
    Router是express中的一个对象
        router是一个中间件，可以在其上绑定路由或者其他中间件
*/
// const router = express.Router();
// router.get("/hello", (req, res) => {
//   res.send("Hello, Router!");
// });
// 引入外部文件的router
const router1 = require(path.resolve(__dirname, "./routes/r1.js"));
app.use("/goods", router1); // 此时访问 router1 内的路由时，地址必须有 goods/  前缀

app.use((req, res) => {
  res.status(404).send("<h1>地址打错了吧😓</h1>");
});

app.listen(3000, () => {
  console.log("服务器已启动！");
});
