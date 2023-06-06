/*
    JS是单线程的，它的运行是基于事件循环机制的（event loop）
        - 调用栈
            - 存放即将执行的代码

        - 任务队列（消息队列）
            - 存放将要执行的代码
            - 当调用栈中的代码执行完毕后，才会依次进入调用栈
            - JS中任务队列有两种
                - 宏任务队列
                    - 大部分代码在宏任务队列中排队
                - 微任务队列
                    - 微任务队列的优先级比宏任务队列高
                    - Promise的回调函数（then，catch，finally）在微任务队列中排队
                    - queueMicrotask() 函数可以主动向微任务队列中添加回调函数
*/
/* 
setTimeout(() => {
    console.log("宏任务队列");
}, 0);

queueMicrotask(() => {
    console.log("手动加入微任务队列");
});
 */
/*
    Promise执行原理
        - Promise 在执行时，then 就相当于给了 Promise 回调函数
            当 Promise 的状态从 pending 变为 fulfilled 时，
            then的回调函数会被放入任务队列中
*/
/* Promise.resolve("保存的数据").then((result) => {
    console.log("result: ", result);
}); */


// console.log("-----end-----");


// 题目：
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);
