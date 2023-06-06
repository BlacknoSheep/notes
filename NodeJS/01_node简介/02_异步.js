/*
    进程和线程
        - 进程：
            - 程序运行的环境
        - 线程
            - 线程是实际进行运算的东西

    同步
        - 通常代码都是自上向下逐行执行的
        - 前面代码不执行后面的代码也不会执行
        - 同步的代码执行会出现阻塞

    解决同步问题
        - java和python通过多线程来解决
        - node.js通过异步的方式来解决

    异步
        - 一段代码的执行不会影响到其他代码
        - 无法通过return来设置返回值
        - 特点：
            - 不会阻塞其他代码
            - 需要通过回调函数来返回结果
        - 基于回调函数的异步带来的问题
            - 代码的可读性差
            - 可调试性差
        - 解决方案：
            - Promise
                - Promise是一个可以用来存储异步调用数据的对象
*/

// 同步
function synWait() {
    const begin = Date.now();
    while (Date.now() - begin < 2000) { }
    console.log("Syn Done!");
}

// 异步
function asynWait() {
    // 2s后将函数送入队列
    setTimeout(() => { console.log("Asyn Done!"); }, 1000);
}

console.log("start!");
synWait();
asynWait();
console.log("end!");


// 异步连加，会发生多层嵌套，可读性和可调试性差
function sum(a, b, cb) {
    setTimeout(() => {
        cb(a + b);
    }, 1000);
}

sum(1, 10, (result) => {
    console.log(result);
    sum(result, 100, (result) => {
        console.log(result);
        sum(result, 1000, (result) => {
            console.log(result);
        });
    });
});
console.log("------------------");
