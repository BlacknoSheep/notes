const express = require("express");
// const cookieParse = require("cookie-parser");
const session = require("express-session");
// 引入 session-file-store
const FileStore = require("session-file-store")(session);

const app = express();

// 配置cookie解析
// app.use(cookieParse());

/*
cookie 的不足
    - cookie 是由服务器创建，浏览器保存的
    1. 每次浏览器访问服务器都需要将 cookie 发回
    2. 并且 cookie 是直接存储在客户端，容易被篡改盗用
    - 为了解决 cookie 的不足，可以
    将用户的数据统一保存在服务器中
        每一个用户有一个 id， cookie 只包含用户对应的 id
        浏览器每次访问时只需要将 id 发回
        这个技术称为 session （会话）

session
    - session 是服务器中的一个对象，这个对象可以用来存储用户的数据
    - 每一个 session 对象都有一个唯一的 id，id 会通过 cookie 的形式发送给客户端
    - 客户端每次访问服务器时，只需要将存储有 id 的 cookie 发回即可获取其在服务器中的数据
    - 可以通过 express-session 组件来实现 session
    - 注意：session 组件并不依赖 cookie-parser ，所以不需要引入
    - session 有效期默认是一次会话

session 什么时候会失效
    1. 浏览器的 cookie 没了
    2. 服务器中的 session 对象没了

express-session 默认将 session 存储到内存中，所以服务器一旦重启，session 会自动重置、
  所以我们通常会对 session 进行一个持久化的操作（写入到文件或数据库）

如何将 session 存入文件中？
  - 使用中间件
    安装 session-file-store
*/
// 配置 session
/*
    会自动在req中添加 session 属性
        1. 若 req.cookies 中，connect.sid 在服务器中有对应的 session，则添加该 session
        2. 否则会创建一个新的 session
*/
app.use(
  session({
    // store: new FileStore({}),
    secret: "65535",
  })
);

app.get("/", (req, res) => {
  console.log(req.session);
  res.send("已获取到session");
});

// 错误地址处理
app.use((req, res) => {
  res.status(404);
  res.send("<h1>地址打错了吧😓</h1>");
});

// 启动服务器
app.listen(3000, () => {
  console.log("服务器已启动！");
});
