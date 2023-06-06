/*
    fs (File System)
        - fs 用来帮助 node 来操作磁盘中的文件（I/O）
        - 需要先引入
        - 读取
            - 通过fs读取磁盘中的数据时，数据会以 Buffer对象 的形式返回
            readFileSync()
                - 参数：文件路径
                - 同步读取，会阻塞后面的代码
            readFile()
                - 异步读取，不会阻塞后面的代码
                - 除了文件路径外，还需要一个回调函数作为参数
*/
const path = require("node:path");
const fs = require("node:fs");

// fs.readFileSync(path.resolve("./hello.txt"));  // 报错，因为调试时根目录为工作目录
// 最好使用path.resolve()生成绝对路径
/* 
const file1 = fs.readFileSync(path.resolve(__dirname, "./hello.txt"));
console.log(file1);
console.log(file1.toString());

fs.readFile(path.resolve(__dirname, "./hello.txt"),
    (err, buffer) => {
        if (err) {
            console.log("出错了！！！");
        }
        else {
            console.log("异步读取：", buffer.toString());
        }
    });

console.log("---end---");
 */

/*
    Promise 版本的 fs 方法
        - 返回一个Promise
*/
const pfs = require("node:fs/promises");
pfs.readFile(path.resolve(__dirname, "./hello.txt"))
    .then(buffer => {
        console.log(buffer.toString());
    })
    .catch(err => {
        console.log("出错了！！！");
    });


(async () => {
    try {
        const buffer1 = await pfs.readFile(path.resolve(__dirname, "./hello.txt"));
        console.log(buffer1.toString());
    }
    catch {
        console.log("出错了！！！");
    }
})();
