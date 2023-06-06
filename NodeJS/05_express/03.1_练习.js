const express = require("express");
const path = require("node:path");
const app = express();
const fs = require("node:fs/promises");

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "./public")));
// 配置请求体解析
app.use(express.urlencoded());

// 配置模板引擎
app.set("view engine", "ejs");
// 配置模板路径
app.set("views", path.resolve(__dirname, "./views"));

const users_path = path.resolve(__dirname, "./data/users.json");

// 从json文件中读取用户信息
let USERS = require(users_path);

// 显示用户信息
app.get("/users", (req, res) => {
  // 渲染模板引擎
  res.render("users", { USERS: USERS });
});

// 添加用户
app.post("/add_user", (req, res) => {
  const userinfo = req.body;
  USERS.push({
    id: USERS.length ? USERS.at(-1).id + 1 : 1,
    name: userinfo.name,
    age: userinfo.age,
    gender: userinfo.gender,
    address: userinfo.address,
  });

  // 将新用户信息写入json文件中
  fs.writeFile(users_path, JSON.stringify(USERS))
    .then(() => {
      res.redirect("/users");
    })
    .catch(() => {
      // 发生错误
      console.log("写入文件失败！");
    });

  // res.send("修改成功！<a href='/users'>点此处返回</a>");

  // 直接在路由中渲染ejs，会面临表单重复提交的问题
  // res.render("users", { USERS: USERS });

  // res.redirect() 用来发起重定向
  // res.redirect("/users");
});

// 删除用户
app.get("/del_user", (req, res) => {
  // 注意：查询字符串传入的参数为 String 类型，需要转为 Number
  const id = +req.query.id;
  // 待删除用户在数组中的索引
  // const idx = USERS.findIndex((user) => user.id === id);
  // 删除用户
  // USERS.splice(idx, 1);
  USERS = USERS.filter((user) => user.id !== id);

  // 保存用户
  fs.writeFile(users_path, JSON.stringify(USERS))
    .then(() => {
      res.redirect("/users");
    })
    .catch(() => {
      // 发生错误
      console.log("写入文件失败！");
    });
});

// 跳转到修改用户信息页面
app.get("/edit_user", (req, res) => {
  const id = +req.query.id;
  const user = USERS.find((user) => user.id === id);
  res.render("edit_user", { user: user });
});

// 修改用户信息
app.post("/do_update", (req, res) => {
  const id = +req.query.id;
  const { name, age, gender, address } = req.body;
  const user = USERS.find((user) => user.id === id);
  user.name = name;
  user.age = +age;
  user.gender = gender;
  user.address = address;

  // 保存用户
  fs.writeFile(users_path, JSON.stringify(USERS))
    .then(() => {
      res.redirect("/users");
    })
    .catch(() => {
      // 发生错误
      console.log("写入文件失败！");
    });

  res.redirect("/users");
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
