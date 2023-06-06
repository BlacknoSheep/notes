/*
    Promise中的
        - then catch finally 这三个方法都会返回一个新的Promise
            - then catch 返回的 Promise 中会保存该方法的返回值
            - finally 返回的 Promise 中不会保存其返回值
*/

function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 1000);
    });
}

console.log("-----first-----");

/* const p1 = sum(2, 20).then(result => {
    console.log(result);
    return result;
}); */

/* console.log("直接打印：", p1);
setTimeout(() => {
    console.log("异步打印：", p1);
}, 1000); */

// 使用Promise优化异步加法
/* sum(1, 10)
    .then((result) => {
        console.log(result);
        return sum(result, 100);
    }).then((result) => {
        console.log(result);
        return sum(result, 1000);
    }).then((result) => {
        console.log(result);
    }); */

/* sum(3, 30)
    .then(result => result + 300)
    .then(result => result + 3000)
    .then(result => console.log(result)); */


/*
    https://promisesaplus.com/
    promise2 = promise1.then(onFulfilled, onRejected);
        1.若 promise1 的状态为 rejected，且 onRejected 回调函数未设置，（即发生异常但没有异常处理）
            则 promise2 的状态也为 rejected，且 promise2 保存的值与 promise1 相同
        2.若 promise1 的状态为 fulfilled，且 onFulfilled 回调函数未设置，
            则 promise2 的状态也为 fulfilled，且 promise2 保存的值与 promise1 相同

    catch是then的语法糖，obj.catch(fn) 内部其实是调用obj.then(undefined, fn)
        所以会适用上述第二条规则
*/
/* 
Promise.reject("异常处理")
    .then(result => console.log("result: ", result))  // 发生异常，未设置 onRejected 回调函数
    .catch(reason => console.log("reason: ", reason))
    .then(result => console.log("第二个then: ", result));  // catch() 返回了一个默认的空的 Promise

Promise.resolve("保存的数据")
    .then(result => result)
    .catch(reason => console.log(reason))
    .then(result => console.log("第二个then: ", result));
 */

/*
    当 Promise 中出现异常，但整个调用链中没有 catch ，则异常会向外抛出
*/
// Promise.reject("有错误！").then(result => console.log("result: ", result));  // 会抛出错误

Promise.reject("错误信息1")
    .then(result => console.log("第一个then: ", result))
    .catch(reason => {
        console.log("处理: ", reason, "，抛出错误信息2");
        throw new Error("错误信息2");
    })
    .then(result => console.log("第二个then: ", result))
    .catch(reason => {
        console.log("最后的处理: ", reason);
    });

console.log("-----last-----");
