/*
    早期的网页中没有实质的模块化方案，所以会存在问题：
        1.无法选择要引入模块的哪些内容
        2.在复杂的场景下非常容易出错
        ......

    在node中，默认支持的模块化方案为CommonJS，
        在CommonJS中，一个js文件就是一个模块

    CommonJS规范
        - 引入模块
            - 使用 require(path) 来引入模块
            - 引入自定义模块时
                - 模块名要以 ./ 或 ../ 开头

        - 引入模块时，会自动补全扩展名
            补全优先级：js > json > node

        - 引入node核心模块时
            - 直接写模块的名字即可
            - 也可以在其前面添加 node:path ，以加快查找速度

    
    默认情况下，Node.js会将以下内容视为CommonJS模块
        1.使用.cjs为扩展名的文件
        2.当前的package.json的type属性为commonjs时，扩展名为.js的文件
        3.当前的package.json不包含type属性时，扩展名为.js的文件
        4.文件的扩展名是mjs、cjs、json、node、js以外的值时（type不是module时）
*/
const m1 = require("./m1.js");
console.log("m1: ", m1);
// m1.fn1();

// 引入核心模块
// const path = require("path");
const path = require("node:path");
console.log(path);


/*
    引入文件夹时，默认引入文件夹下的 index.js
*/
const m2 = require("./m2");
console.log(m2);


/* 只引入部分变量 */
const a = require("./m1.js").a;
console.log(a);
// 解构赋值
const { b } = require("./m1.js");
console.log(b);
