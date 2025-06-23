/*
    express 是 node 中的服务器软件
        通过 express 可以快速在 node 中搭建一个 web 服务器
*/
// 引入express
const express = require("express");
// console.log(express);

// 获取服务器对象
const app = express();

/*
    app.listen(端口号[, 回调函数])
        用来启动服务器
        - 服务器启动后，便可以通过端口号来访问服务器
        - 协议名://ip地址:端口号/路径
            http://localhost:3000
            http://127.0.0.1:3000

    如果希望服务器可以正常访问，则需要为服务器设置路由
        路由可以根据不同的请求方式和请求地址来处理用户的请求
        app.get()  处理get请求
        app.post()  处理post请求

        - 在路由中，需要做两件事
            1. 读取用户的请求（request）
            2. 根据用户的请求返回响应（response）

        - 路由的回调函数执行时，会收到三个参数
            1. request  请求对象
            2. response  响应对象
                res.sendStatus(404)  向客户端发送响应状态码
                res.status(404)  设置响应状态码（并未发送）
                res.send()  设置并发送响应体
                默认响应状态码为200
            3. next
                是一个函数，调用该函数后可以触发后续的中间件
                    链式触发的中间件共享 req 和 res
    
    中间件
        - 在 express 中可以使用 app.use() 来定义一个中间件
            中间件的作用类似于路由
        - 和路由的区别：
            1. 会匹配所有请求（get、post）
            2. 路径会匹配路径及其子路径
            3. 若不指定路径，则默认匹配所有路径

    中间件的分类：
        1. 应用级别中间件
            绑定到服务器实例上的中间件就是应用级别的中间件
            全局中间件：use()
            局部中间件：get(), post()
            
        2. 路由级别中间件
            绑定到express.Router路由实例上的中间件

        3. 错误级别中间件
        
        4. Express内置中间件
            express.static()  托管静态资源
            express.json()  解析JSON格式
            express.urlencoded()  解析请求体

        5. 第三方中间件
*/
app.listen(3000, () => {
  console.log("服务器已启动！");
});

// "/" 相当于 "http://localhost:3000"   注意：不能用 "./"
// 路径表示
/* app.get("/", (req, res) => {
    console.log("被访问了~");
    // console.log("request: ", req);
    // console.log("response: ", res);
    console.log(req.url);
    // res.sendStatus(404);
    res.status(200);
    res.send("请求已收到，但是<em>对不起，做不到！</em>");
}); */

/*
    多个 use 会以队列的形式排列，先进先出
        若前一个 use 已处理完请求，则后续 use 的内容不会执行
        next() 不能在响应处理完毕后调用
*/
app.use("/", (req, res, next) => {
  console.log("111");
  // res.send("111");
  next();
});

app.use("/", (req, res) => {
  console.log("222");
  res.send("222");
});
