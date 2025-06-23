/*
    Promise的静态方法：
        Promise.resolve(data)
        Promise.reject(error)
            创建一个Promise并存入数据

        Promise.all([...])
            - 当所有 promise 都 fulfill 时同时返回多个 Promise 对象的执行结果
                将所有 promise 的值以数组的形式保存在返回的 Promise对象中
            - 其中有一个报错就报错
        
        Promise.allSettled([...])
            - 也是同时返回多个 Promise 对象的执行结果
            - 返回的是对象的数组（具有两个属性）
            - 但是无论中途是否报错都返回

        Promise.race([...])
            - 返回最先执行完的
            - 不考虑是否报错

        Promise.any([...])
            - 返回执行最快的正常完成的（即会忽略报错的）
            - 都报错则报错
*/

function sum(a, b) {
    return Promise.resolve(a + b);
}

Promise.all([
    sum(1, 10),
    // Promise.reject("报个错-all"),  // 会导致整体报错
    sum(2, 20),
    sum(3, 30),
]).then(result => {
    console.log("all-result: ", result);
}).catch(reason => {
    console.log("all-reason: ", reason);
});


Promise.allSettled([
    sum(1, 10),
    Promise.reject("报个错-allSettled"),  // 可以正常执行
    sum(2, 20),
    sum(3, 30),
]).then(result => {
    console.log("allSettled-result: ", result);
}).catch(reason => {
    console.log("allSettled-reason: ", reason);
});


Promise.race([
    // sum(1, 10),
    Promise.reject("报个错-race"),  // 它最先就返回错误
    sum(2, 20),
    sum(3, 30),
]).then(result => {
    console.log("race-result: ", result);
}).catch(reason => {
    console.log("race-reason: ", reason);
});


Promise.any([
    // sum(1, 10),
    Promise.reject("报个错-any"),  // 它最先就返回错误
    sum(2, 20),
    sum(3, 30),
]).then(result => {
    console.log("any-result: ", result);
}).catch(reason => {
    console.log("any-reason: ", reason);
});

Promise.any([
    Promise.reject("都报错1"),
    Promise.reject("都报错2"),
]).then(result => {
    console.log("any2-result: ", result);
}).catch(reason => {
    console.log("any2-reason: ", reason);
});
