import m1 from "./m1.js";
import m2 from "./m2.js";

import "./style/index.css";
import img from "./assets/bilibili.png";
// img 会被赋值为打包后的图片路径（或base64字符串）

document.body.insertAdjacentHTML("beforeend", `<div><img src="${img}" /></div>`);

// console.log("Hello, world!");
document.body.insertAdjacentHTML("beforeend", "Hello, world!");
m1.sayHello();
m2.sayHello();
