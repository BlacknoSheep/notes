/*
    所有CommonJs都会被包装到一个函数中
        (function(exports, require, module, __filename, __dirname) {
            // 模块代码会被放到这里
        });

            __filename： 当前模块的绝对路径
            __dirname: 当前模块所长的目录的绝对路径
*/
(function (exports, require, module, __filename, __dirname) {
    let a = 1;
    let b = 2;
});

console.log(arguments);
