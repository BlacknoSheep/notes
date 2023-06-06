/*
    默认情况下，node中的模块化标准为CommonJS
    要想使用ES的模块化，可与i采用以下两种方案：
        1.使用mjs作为扩展名
        2.修改package.json将模块化规范设置为ES模块
            {"type": "module"}
            设置后当前项目下所有的js文件都默认为es module

    ES模块默认是严格模式

    ES模块化在浏览器中同样支持，但是通常不会直接使用（兼容性问题），
        通常都会结合打包工具使用
*/

// console.log(module);  // 报错

/*
    导入 ES 模块
        - 不能省略扩展名（官方标准）
*/
// import { a, b, obj1 } from "./m3.mjs";

// 可以通过 as 来指定别名
// import { a as A, b, obj1 } from "./m3.mjs";

// console.log(A, b, obj1);

// 将所有内容导入到一个对象中
// 开发时要尽量避免 import * 的情况
// import * as m3 from "./m3.mjs";
// console.log(m3);
// console.log(m3.obj1);

/*
    导入默认导出
        - 默认导出的内容可以随意命名
*/
// import m3Fn from "./m3.mjs";
// console.log(m3Fn);
// import m3Fn, { obj1 } from "./m3.mjs";
// console.log(m3Fn);
// console.log(obj1);


// 通过es模块导入的内容都是常量
import { a, b, obj1 } from "./m3.mjs";
console.log(a);
// a = 20;  // 报错
console.log(obj1);
obj1.name = "Taffy";
console.log(obj1);

