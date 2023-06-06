const express = require("express");
const app = express();
const path = require("node:path");

app.listen(3000, () => {
  console.log("服务器已启动！");
});

/*
    服务器中的代码对外部来说是不可见的
        若希望浏览器可以访问，则需要将页面所在目录设置为静态资源
        app.use(express.static(PATH))
        设置后浏览器会在 PATH 目录下查找文件
*/

app.use(express.static(path.resolve(__dirname, "./public")));

// 默认找index.html，所以不会返回下面的
// app.get("/", (req, res) => {
//     res.send("没访问到网页");
// });

/*
    获取用户的输入
        req.query   查询字符串中的请求参数（对象的形式）
*/
app.get("/login", (req, res) => {
  console.log("请求已收到！");
  // res.send("登录成功！");

  console.log(req.query);
  const { username, password } = req.query;
  console.log(username, password);
  if (username === "Taffy" && password === "tcg") {
    res.send("登录成功！");
  } else {
    res.send("用户名或密码错误！");
  }
});

/*
    get请求发送参数的第二种方式

    /hello/:id    表示当用户访问 /hello/xxx 时就会触发
        在路径中以冒号开头的部分称为 param， 在 get 请求时它可以被解析为请求参数
        可以通过 req.params 属性来获取这些参数
        param 传参一般不会传递特别复杂的参数（通常只用一个）
*/
app.get("/hello/:id", (req, res) => {
  res.send("<h1>这是hello路由</h1>");
  console.log(req.params);
});

/*
    post路由
    通过 req.body 获取请求体中的参数
        默认情况下，express 不会自动解析请求体，需要通过中间件为其增加功能
*/
// 引入解析请求体的中间件
app.use(express.urlencoded());

app.post("/login", (req, res) => {
  // res.send("<h1>post请求已收到！</h1>");
  console.log(req.body);
  const { username, password } = req.body;
  if (username === "Taffy" && password === "tcg") {
    res.send("登录成功！");
  } else {
    res.send("用户名或密码错误！");
  }
});
