const express = require("express");
const path = require("node:path");
const app = express();

let USERS = [
  {
    username: "Taffy",
    password: "tcg",
    nickname: "永雏塔菲",
  },
  {
    username: "14sf",
    password: "01",
    nickname: "十四师傅",
  },
];

app.listen(3000, () => {
  console.log("服务器已启动！");
});

// 设置静态资源目录
app.use(express.static(path.resolve(__dirname, "./public")));
// 设置解析请求体
app.use(express.urlencoded());

// 登录
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const currentUser = USERS.find((user) => {
    return user.username === username && user.password === password;
  });
  if (currentUser) {
    res.send(`欢迎回来，${currentUser.nickname}！`);
  } else {
    res.send("用户名或密码错误");
  }
});

// 注册
app.post("/regist", (req, res) => {
  const { username, password, repwd, nickname } = req.body;
  if (password !== repwd) {
    res.send("两次输入的密码不一致！");
    return;
  }
  if (USERS.find((user) => user.username === username)) {
    res.send("用户名已存在！");
    return;
  }
  USERS.push({ username: username, password: password, nickname: nickname });
  res.send("注册成功！");
  console.log(USERS);
});
