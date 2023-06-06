const express = require("express");
const path = require("node:path");
const app = express();

// 启动服务器
app.listen(3000, () => {
  console.log("服务器已启动！");
});

// 配置静态资源路径
app.use(express.static(path.resolve(__dirname, "./public")));
// 配置请求体解析
app.use(express.urlencoded());

app.get("/hello", (req, res) => {
  res.send("<h1>Hello!</h1>");
});

/*
    html 页面属于静态页面，不会跟随服务器中的数据的变化而变化

    在网页中嵌入变量可以使用模板
    在nodejs中存在很多模板引擎

    ejs 是node中的一款模板引擎
        1. 安装 ejs
        2. 配置 express 模板引擎为 ejs
        3. 配置模板引擎时，express 会自动引入，不需要手动引入
    
    注意：模板引擎需要被express渲染后才能使用
        res.render() 用来渲染一个模板引擎，并将其返回给浏览器
            第一个参数：使用的模板
            第二个参数：一个对象，在模板中可以访问到这个对象中的数据
*/
// 配置模板引擎
app.set("view engine", "ejs");
// 配置模板路径
app.set("views", path.resolve(__dirname, "./views"));

/*
    使用ejs时
        <%= %> 会自动对字符串中的特殊符号进行转义（标签会直接显示出来）
            这个设计主要是为了避免 xss 攻击
        <%- %> 不会自动进行转义
        <% %> 直接写 js 代码（在服务器执行）
*/
let student = { name: "Taffy" };

app.get("/students", (req, res) => {
  // 渲染模板引擎
  res.render("students", student);
});

app.get("/rename", (req, res) => {
  student.name = req.query.username;
  res.send("<h1>修改成功！</h1>");
});

// 可以在所有路由后面配置错误路由
// 不设置path默认匹配所有路径
app.use((req, res) => {
  res.status(404);
  res.send("<h1>地址打错了吧😓</h1>");
});
