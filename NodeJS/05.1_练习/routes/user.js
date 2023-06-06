const express = require("express");
const path = require("node:path");
const fs = require("node:fs/promises");
const exp = require("node:constants");
const router = express.Router();
// 引入uuid
const uuid = require("uuid").v4;

const users_path = path.resolve(__dirname, "../data/users.json");
// 从json文件中读取用户信息
let USERS = require(users_path);

// 阻止 csrf 攻击
// 检查 referer 头
router.use((req, res, next) => {
  const referer = req.get("referer");
  console.log("请求来自：", referer);

  // 检查referer
  if (!referer || !referer.startsWith("http://localhost:3000/")) {
    res.status(403).send("你没有这个权限！");
  } else {
    next();
  }
});

// 统一进行权限验证
router.use((req, res, next) => {
  // console.log(req.session.loginUser);
  if (req.session.loginUser) {
    next();
  } else {
    res.redirect("/");
  }
});

// 显示用户信息
router.get("/list", (req, res) => {
  const csrfToken = uuid();
  req.session.csrfToken = csrfToken;
  req.session.save(() => {
    res.render("list", { USERS: USERS, loginUser: req.session.loginUser, csrfToken: csrfToken });
  });
});

function saveAndRedirect(res, target) {
  // 保存用户信息并重定向
  fs.writeFile(users_path, JSON.stringify(USERS))
    .then(() => {
      res.redirect(target);
    })
    .catch(() => {
      console.log("写入文件失败！");
    });
}

// 添加用户
router.post("/add", (req, res) => {
  const csrfToken = req.body._crsfToken;
  if (req.session.csrfToken && req.session.csrfToken === csrfToken) {
    // token为一次性的，比对完即弃
    req.session.csrfToken = null;

    const userinfo = req.body;
    USERS.push({
      id: USERS.length ? USERS.at(-1).id + 1 : 1,
      name: userinfo.name,
      age: userinfo.age,
      gender: userinfo.gender,
      address: userinfo.address,
    });
    saveAndRedirect(res, "/user/list");
  } else {
    res.status(403).send("token不正确，禁止访问！");
  }
});

// 删除用户
router.get("/delete", (req, res) => {
  // token为一次性的，比对完即弃
  req.session.csrfToken = null;
  const id = +req.query.id;
  USERS = USERS.filter((user) => user.id !== id);
  saveAndRedirect(res, "/user/list");
});

// 跳转到修改用户信息页面
router.get("/update", (req, res) => {
  const id = +req.query.id;
  const user = USERS.find((user) => user.id === id);
  res.render("update", { user: user });
});

// 修改用户信息
router.post("/do_update", (req, res) => {
  const id = +req.query.id;
  const { name, age, gender, address } = req.body;
  const user = USERS.find((user) => user.id === id);
  user.name = name;
  user.age = +age;
  user.gender = gender;
  user.address = address;
  saveAndRedirect(res, "/user/list");
});

module.exports = router;
