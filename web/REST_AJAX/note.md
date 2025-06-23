# 一、传统服务器
**传统服务器使用MVC框架**  
&emsp;&emsp;Model 模型 —— 表示业务规则  
&emsp;&emsp;View 视图 —— 用户界面  
&emsp;&emsp;Controller 控制器 —— 负责加载数据并选择视图来呈现数据

传统服务器直接为用户返回一个页面。  
但是，传统的服务器并不能适用于现在的场景：

    一个应用通常会有多个客户端（client）存在
        web端，移动端（app），PC端
    只返回 html 页面无法适应所有客户端

传统的服务器需要做两件事：

    1. 加载数据
    2. 渲染视图

解决方案

    将渲染视图的功能从服务器中剥离出来，服务器只负责向客户端返回数据，渲染视图的功能由客户端自行完成。
    分离以后，服务器只需要提供数据，可以用户多种客户端，简化了服务器代码的编写。
    
# 二、REST（Representational State Transfer）
1. 主要特点：服务器只返回数据
2. 服务器和客户端传输数据时通常会使用JSON作为数据格式
3. 请求的方法
    - GET &emsp; 加载数据
    - POST &emsp; 新建或添加数据
    - PUT &emsp; 添加或修改数据
    - PATCH &emsp; 修改数据
    - DELETE &emsp; 删除数据
    - OPTION &emsp; 由浏览器自动发送，检查请求的一些权限
4. API（接口），Endpoint（端点）
    - GET /user
    - POST /user


