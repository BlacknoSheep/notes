/*
    定义模块时，模块中的内容默认无法被外界访问
            可以通过exports来设置要向外部暴露的内容

    访问exports的方法有两种：
        exports
        module.exports
    
    - 当在其他模块中引入当前模块时，require函数返回的就是exports
    - 可以将希望暴露给外部函数的内容设置为exports的属性
*/
// let a = 1;
// let b = 2;
// console.log(`a=${a}, b=${b}`);


// console.log("exports: ", exports);
// console.log("module.exports: ", module.exports);
// console.log(exports === module.exports);  // true

// 可以通过exports一个一个导出值
// exports.a = "a";
// exports.b = "b";
// exports.fn1 = () => {
//     console.log("m1中的fn1");
// };

// 也可以通过module.exports来一次导出多个值
module.exports = {
    a: "一次导入多个值",
    b: "bbb",
};


/*
    exports 是对 module.exports 的一个引用
        为其赋一个新的值后它就不再是 module.exports 的引用了
*/
exports = {
    a: "111",
};
console.log(module.exports === exports);  // false


