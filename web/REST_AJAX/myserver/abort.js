const express = require("express");
const app = express();

// 设置允许的请求
app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  next();
});

// 不处理请求
app.get("/test", (req, res) => {});

app.get("/hello", (req, res) => {
  res.send({
    status: "ok",
    data: { name: "Taffy" },
  });
});

app.listen(3000, () => {
  console.log("服务器已启动");
});
