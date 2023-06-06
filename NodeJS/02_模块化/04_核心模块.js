/*
    核心模块
        - 是node中自带的模块，可以在node中直接使用

    window 是浏览器的宿主对象，node 中是没有的
    global 是 node 中的全局对象，作用类似于 window
    在ES标准中，全局对象的标准名应该是 globalThis
        node中：global === globalThis
        浏览器中：window === globalThis
*/
// console.log(global === globalThis);  // true

/*
    核心模块
        process
            - 表示当前的 node 进程
            - 通过该对象可以获取进程的信息，或者对进程做各自操作
            - 如何使用
                1. process是一个全局变量，可以直接使用
                2. process 的属性和方法：
                    process.exit()
                        - 结束当前进程，终止node
                        - 可以传一个参数作为错误代码

                    process.nextTick(callback[, ...args])
                        - 将函数插入到 tick 队列中
                        - tick队列中的代码，会在下一次事件循环之前执行
                            会在微任务队列和宏任务队列之前执行
*/
// console.log(process);
// process.exit();
// console.log("---end----");

setTimeout(() => {
  console.log(1);
}, 0);

queueMicrotask(() => {
  console.log(2);
});

process.nextTick(() => {
  // tick队列
  console.log(3);
});

console.log(4);
