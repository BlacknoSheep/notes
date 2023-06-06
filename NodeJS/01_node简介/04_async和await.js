
function fn() {
    return Promise.resolve("数据");
}

fn().then(result => {
    console.log(result);
});

/*
    通过async可以来创建一个异步函数
        异步函数的返回值会自动封装到一个Promise中

    在async声明的异步函数中，可以使用await关键字来调用异步函数
        通过await调用异步函数时，会暂停代码的运行
            直到异步代码执行有结果，才会将结果返回
            注意：只会阻塞async内的代码
        注意：await只能用于async声明的异步函数中，或者es模块的顶级作用域中

        通过await调用异步代码时，需要通过try-catch来处理异常
*/

async function fn2() {
    return "async数据";
}

fn2().then(r => {
    console.log(r);
});


function sum(a, b) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    });
}

async function fn3() {
    console.log("没被await阻塞");

    // 链式调用
    // sum(1, 10)
    //     .then(r => sum(r, 100))
    //     .then(r => sum(r, 1000))
    //     .then(r => console.log(r));

    // await
    try {
        let result = await sum(1, 10);
        result = await sum(result, 100);
        console.log(result);  // 会被await阻塞
    } catch (e) {
        console.log("出错了");
    }
};
fn3();


console.log("---end---");  // 不会被await阻塞
