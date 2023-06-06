/*
    path 模块
        - 通过path可以获取各自路径
        - 要使用path，需要先对其进行引入
        - 方法：
            path.resolve([...paths])
                - 用来生成绝对路径
                - 若直接调用 resolve，则返回当前的工作目录
                - 若将一个相对路径（对应的文件或文件夹可以不存在）作为参数，则返回对应的绝对路径
                    根据工作目录的不同，产生的绝对路径也不同
                - 一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数
                    此时会自动计算出最终的路径
*/
const path = require("node:path");
console.log(path);

console.log(path.resolve()); // 当前工作目录：E:\vscode\NodeJS

console.log(path.resolve("./aa.js")); // 工作目录+\aa.js： E:\vscode\NodeJS\aa.js

console.log(path.resolve("E:/xyz/hhh", "bbb.js")); // E:\xyz\hhh\bbb.js
console.log(path.resolve("E:/xyz/hhh", "../bbb.js")); // E:\xyz\bbb.js

// __dirname：当前模块的绝对路径
console.log(path.resolve(__dirname, "./hello.js")); // 始终返回：E:\vscode\NodeJS\02_模块化\hello.js
