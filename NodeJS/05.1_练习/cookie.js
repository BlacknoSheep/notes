const express = require("express");
const cookieParse = require("cookie-parser");
const app = express();

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
            可以通过res.cookie() 的第三个参数（配置对象）来设置有效期
                expires  指定过期时间
                    new Date()返回当前时间，即阅后即焚
                maxAge  指定有效期，单位：ms

        - cookie 一旦发送给浏览器就不能再修改了
            但是我们可以通过发送新的 同名 cookie 来替换旧的 cookie
*/

// 配置cookie解析
app.use(cookieParse());

app.get("/", (req, res) => {
  res.send(
    '<div><a href="/set_cookie">set_cookie</a></div><div><a href="/del_cookie">del_cookie</a></div><div><a href="/hello">hello</a></div>'
  );
});

app.get("/set_cookie", (req, res) => {
  res.cookie("name", "Taffy", {
    // expires: new Date(),
    maxAge: 1000 * 100,
  });
  // res.send("<h2>cookie已设置！</h2>");
  res.redirect("/");
});

app.get("/del_cookie", (req, res) => {
  res.cookie("name", "", {
    maxAge: 0,
  });
  res.redirect("/");
});

app.get("/hello", (req, res) => {
  res.send("<h2>Hello!</h2>");
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
