const path = require("node:path");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

// 配置请求体解析
app.use(express.urlencoded({ extended: true }));
// 配置JSON格式请求体解析
app.use(express.json());

let STU_LIST = require(path.resolve(__dirname, "./data/students.json"));

app.use((req, res, next) => {
  // 设置响应头
  /*
    Access-Control-Allow-Origin
      - 允许的请求来源
        * 表示允许任意来源的请求
        设置指定值时，只能设置一个

    Access-Control-Allow-Methods
      - 允许的请求方式

    Access-Control-Allow-Headers
      - 允许传递的请求头
  */
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
});

// 定义一个登录的路由
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "123123") {
    const nickname = "管理员";
    // 生成token
    const token = jwt.sign(
      {
        name: "admin",
        nickname: nickname,
      },
      "admin65535",
      {
        expiresIn: "1h",
      }
    );
    res.send({
      status: "ok",
      data: {
        token: token,
        nickname: nickname,
      },
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "用户名或密码错误",
    });
  }
});

//  students 路由必须在用户登录后才能访问
// 返回学生列表
app.get("/students", (req, res) => {
  // console.log("收到student的GET请求");

  try {
    // 需要去掉前面的认证方式部分
    const token = req.get("Authorization").split(" ")[1];
    // console.log(token);
    // 对token进行解码
    decodedToken = jwt.verify(token, "admin65535");
    // 解码成功
    res.send({
      status: "ok",
      data: STU_LIST,
    });
  } catch (err) {
    res.status(403).send({
      status: "error",
      data: "token无效！",
    });
  }
});

// 查询某个学生信息
app.get("/students/:id", (req, res) => {
  const id = +req.params.id;
  const stu = STU_LIST.find((item) => item.id === id);
  if (stu) {
    res.send({
      status: "ok",
      data: stu,
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "学生id不存在！",
    });
  }
});

// 定义添加学生的路由
app.post("/students", (req, res) => {
  const { name, age, gender, address } = req.body;
  const stu = {
    id: STU_LIST.at(-1).id + 1,
    name: name,
    age: +age,
    gender: gender,
    address: address,
  };
  STU_LIST.push(stu);
  res.send({
    status: "ok",
    data: stu,
  });
});

// 定义删除学生的路由
app.delete("/students/:id", (req, res) => {
  const id = +req.params.id;
  for (let i = STU_LIST.length - 1; i >= 0; --i) {
    if (STU_LIST[i].id === id) {
      const delStu = STU_LIST[i];
      STU_LIST.splice(i, 1);
      res.send({
        status: "ok",
        data: delStu,
      });
      return;
    }
  }
  res.status(403).send({
    status: "error",
    data: "学生id不存在！",
  });
});

// 定义修改学生的路由
app.put("/students/:id", (req, res) => {
  const id = +req.params.id;
  const { name, age, gender, address } = req.body;
  const stu = STU_LIST.find((item) => item.id === +id);
  if (stu) {
    stu.name = name;
    stu.age = age;
    stu.gender = gender;
    stu.address = address;
    res.send({
      status: "ok",
      data: stu,
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "学生id不存在！",
    });
  }
});

app.listen(3000, () => {
  console.log("服务器已启动！");
});
