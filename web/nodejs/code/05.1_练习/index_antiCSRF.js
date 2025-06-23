const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("node:path");
const app = express();

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "./public")));
// 配置请求体解析
app.use(express.urlencoded());
// 配置模板引擎
app.set("view engine", "ejs");
// 配置模板路径
app.set("views", path.resolve(__dirname, "./views"));

// 配置 session
app.use(
  session({
    store: new FileStore({
      path: path.resolve(__dirname, "./sessions"), // 保存路径，默认 "./sessions"
      secret: "12345", // 加密保存
      //   ttl: 20, // session的有效时间，单位 s
      // 默认情况下，fileStore 会每隔1小时清除一次 session 对象
      //   reapInterval: 40, // 清除间隔，单位 s
    }),
    secret: "65535",
  })
);

// 首页
app.get("/", (req, res) => {
  res.render("index");
});

// 登录
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123123") {
    /*
      注意：这里仅仅只是将 loginUser 添加到了内存的 session 中
        而没有将值存入文件中
    */
    req.session.loginUser = username;
    // 为了使 session 可以立刻存储，需要手动调用 save
    req.session.save(() => {
      res.redirect("/user/list");
    });
  } else {
    res.send("<h2>用户名或密码错误！<a href='/'>点此返回</a></h2>");
  }
});

// 登出
app.get("/logout", (req, res) => {
  // 使session失效
  req.session.destroy(() => {
    res.redirect("/");
  });
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
