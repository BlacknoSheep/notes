/*
    Promise
        - 用来解决异步中回调函数的问题
        - 具有特殊的存储数据的方式，可以用于存储异步调用的结果
*/

/*
    创建Promise
        - 创建Promise时，构造函数中需要一个回调函数作为参数
        - Promise构造函数的回调函数，会在创建Promise时调用，调用时会有两个参数传入

    resolve 和 reject 参数
        -resolve 和 reject 是两个函数，通过这两个函数可以向Promise中存储数据
            - resolve 在执行正常时存储数据
            - reject 在执行错误时存储数据
        - 通过函数向Promise中添加数据的好处
            可以用来添加异步调用的数据
*/
const promise = new Promise((resolve, reject) => {
    // resolve("resolve保存的数据");
    reject("reject保存的数据");
    /*
    setTimeout(() => {
        resolve("resolve保存的数据");
    }, 1000);
    */
});

// 调用静态函数创建Promise对象并存储数据
const promise2 = Promise.resolve("数据");

console.log(promise);
console.log(promise2);

// setTimeout(() => {
//     console.log(promise);
// }, 1500);

/*
    读取数据
        - 可以通过Promise的实例方法then来读取Promise中存储的数据
        - then需要两个回调函数作为参数，回调函数用来读取Promise中的数据
            - 通过resolve存储的数据，会调用第一个函数读取
                可以在第一函数中编写处理数据的代码
            - 通过reject存储的数据或出现异常时，会调用第二个函数读取
                可以在第二个函数中编写处理异常的代码
*/
promise.then((result) => {
    console.log("result: ", result);
}, (reason) => {
    console.log("reason: ", reason);
});


/*
    Promise中维护了两个隐藏属性
        - PromiseResult
            - 用来存储数据
        
        - PromiseState
            - 记录Promise的状态（三种）
                - pending：进行中
                - fulfilled：完成，通过resolve存入了数据
                - rejected：拒绝，出错了或通过reject存入了数据
            - state只能修改一次，修改后永远不会再改变

        流程：
            - 当Promise创建时，PromiseState初始值为pending
            - 通过resolve存入数据时,PromiseState变为fulfilled
                PromiseResult变为存储的数据
            - 通过reject存入数据或者出错时，PromiseState变为rejected
                PromiseResult变为存储的数据或异常对象

        当通过then读取数据时，相当于为Promise设置了回调函数
            - 若PromiseState==="fulfilled"，则调用then的第一个回调函数
            - 若PromiseState==="rejected"， 则调用then的第二个回调函数
            - then的回调函数会在后面的通常代码后执行
*/
console.log("11");  // 在then的回调函数前执行


/*
    catch() 方法：
        和 then() 类似，但是只需要一个回调函数作为参数
            catch() 中的回调函数只会在 PromiseState==="rejected" 时才调用
                相当于 then(null, reason => {})
            catch() 就是一个专门用来处理Promise异常的方法
*/
const promise3 = new Promise((resolve, reject) => {
    reject("promise3的reject数据");
});
promise3.catch(reason => {
    console.log(reason);
});

/*
    finally() 方法
        - 无论是正常存储数据还是出现异常都会执行
        - finally() 的回调函数中不会接收数据
        - finally() 通常用来编写一些无论成功与否都要执行的代码
*/
promise3.finally(() => {
    console.log("finally() 执行了！");
}).catch(reason => {
    console.log(reason);
});
