const path = require("node:path");
const pfs = require("node:fs/promises");

/*
    fs.readFile() 读取文件
    fs.appendFile() 将数据添加到已有文件中
        若文件不存在则会创建新文件后再添加
    fs.mkdir() 创建目录
        可以接收一个 配置对象 作为第二个参数，通过该对象可以对方法的功能进行配置
            recursive 默认值 false，设置为true后会自动创建不存在的上一级目录
    fs.rmdir() 删除目录
    fs.rm() 删除文件
    fs.unlink() 移出符号链接
        若路径为文件则删除该文件
    fs.rename() 重命名
        - 相当于剪切
    fs.copyFile() 复制文件
        - 相当于复制
*/
/* pfs.appendFile(path.resolve(__dirname, "./hello123.txt"), "World!")
    .then(result => {
        console.log(result);  // undefined
        console.log("添加成功");
    }); */


// pfs.rm(path.resolve(__dirname, "bilibili.png"))
//     .then(r => { console.log("删除文件成功！"); });
// pfs.rmdir(path.resolve(__dirname, "hello"))
//     .then(r => { console.log("删除文件夹成功！"); });


pfs.readFile(path.resolve(__dirname, "../imgs/bilibili.png"))
    .then(r => pfs.appendFile(path.resolve(__dirname, "bilibili.png"), r))
    .then(() => {
        console.log("操作结束");
    });


pfs.mkdir(path.resolve(__dirname, "./hello"))
    .then(r => {
        console.log("创建成功！");
    });

