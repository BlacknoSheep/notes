const express = require("express");
const cookieParse = require("cookie-parser");
const path = require("node:path");
const app = express();

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "./public")));
// 配置请求体解析
app.use(express.urlencoded());
// 配置 cookie 解析
app.use(cookieParse());
// 配置模板引擎
app.set("view engine", "ejs");
// 配置模板路径
app.set("views", path.resolve(__dirname, "./views"));

/*
    HTTP协议是一个无状态的协议，
        服务器无法区分请求是否发送自同一个客户端

    cookie
        - cookie 是 HTTP 协议中用来解决无状态问题的技术
        - cookie 的本质就是一个头
            - 服务器以响应头的形式将cookie发送给客户端
                客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回
                这样服务器就可以通过cookie来识别出客户端了

        - cookie 是有有效期的，默认情况下 cookie 的有效期是一次会话
            会话就是一次从打开到关闭浏览器的过程
*/
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  if (username === "admin" && password === "123123") {
    // 发送 cookie 给浏览器
    res.cookie("username", "admin");
    res.redirect("/user/list");
  } else {
    res.send("<h2>用户名或密码错误！<a href='/'>点此返回</a></h2>");
  }
});

const router = require(path.resolve(__dirname, "./routes/user.js"));
app.use("/user", router);

// 错误地址处理
app.use((req, res) => {
  res.status(404);
  res.send("<h1>地址打错了吧😓</h1>");
});

// 启动服务器
app.listen(3000, () => {
  console.log("服务器已启动！");
});
