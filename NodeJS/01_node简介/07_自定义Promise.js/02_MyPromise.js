/*
    微任务队列
*/

const PROMISE_STATE = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2,
};

class MyPromise {
    // 创建一个变量用来存储Promise的结果
    #value;
    // 记录状态
    #state = PROMISE_STATE.PENDING;
    // 存储回调函数
    #callback;

    constructor(executor) {
        // 通过bind绑定this
        executor(this.#resolve.bind(this), this.#reject.bind(this));  // 调用回调函数
    }

    #resolve(value) {
        if (this.#state !== PROMISE_STATE.PENDING) return;
        this.#value = value;
        this.#state = PROMISE_STATE.FULFILLED;

        // 当resolve执行时，说明数据已经存入，需要调用then的回调函数
        this.#callback && queueMicrotask(() => { this.#callback(this.#value); });
    }

    #reject(value) {

    }

    then(onFulfilled, onRejected) {
        if (this.#state === PROMISE_STATE.PENDING) {
            // 若数据还未存入Promise，则将回调函数设置为callback的值
            this.#callback = onFulfilled;
        }
        else if (this.#state === PROMISE_STATE.FULFILLED) {
            // 放入微任务队列
            queueMicrotask(() => {
                onFulfilled(this.#value);
            });
        }
    }
}

setTimeout(() => {
    console.log("宏任务队列");
}, 0);

const mp = new MyPromise((resolve, reject) => {
    console.log("给构造函数的回调函数调用了");
    /* setTimeout(() => {
        resolve("异步存入的数据");
    }, 1000); */
    resolve("同步存入的数据");
});

mp.then(result => {
    console.log("微任务队列：", result);
});

console.log("主进程");
