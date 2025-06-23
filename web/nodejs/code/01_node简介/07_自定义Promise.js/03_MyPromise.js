/*
    多次读取
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
    // 由于回调函数可能有多个，所以用数组来保存
    #callbacks = [];

    constructor(executor) {
        // 通过bind绑定this
        executor(this.#resolve.bind(this), this.#reject.bind(this));  // 调用回调函数
    }

    #resolve(value) {
        if (this.#state !== PROMISE_STATE.PENDING) return;
        this.#value = value;
        this.#state = PROMISE_STATE.FULFILLED;

        // 当resolve执行时，说明数据已经存入，需要调用then的回调函数
        this.#callbacks && queueMicrotask(() => {
            this.#callbacks.forEach(cb => {
                cb();
            });
        });
    }

    #reject(value) {

    }

    then(onFulfilled, onRejected) {
        if (this.#state === PROMISE_STATE.PENDING) {
            // 若数据还未存入Promise，则将回调函数设置为callback的值
            this.#callbacks.push(() => {
                onFulfilled(this.#value);
            });
        }
        else if (this.#state === PROMISE_STATE.FULFILLED) {
            // 放入微任务队列
            queueMicrotask(() => {
                onFulfilled(this.#value);
            });
        }
    }
}

const mp = new MyPromise((resolve, reject) => {
    // console.log("给构造函数的回调函数调用了");
    setTimeout(() => {
        resolve("异步存入的数据");
    }, 1000);
    // resolve("同步传入的数据");
});

mp.then(result => {
    console.log("第一次读取：", result);
});

mp.then(result => {
    console.log("第二次读取：", result);
});


