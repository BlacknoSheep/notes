
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
        // 接收一个执行器作为参数
        // 通过bind绑定this
        executor(this.#resolve.bind(this), this.#reject.bind(this));  // 调用回调函数
    }

    /* #resolve(value) {
        // this指向调用该方法的对象，而mp中并未通过对象调用！
        console.log(this);  // undefined
        this.#value = value;  // 报错！
    } */

    /* #resolve = (value) => {
        // 箭头函数没有自己的this，它的this是其外层作用域的this
        this.#value = value;
        console.log(this);
    }; */

    #resolve(value) {
        if (this.#state !== PROMISE_STATE.PENDING) return;
        this.#value = value;
        this.#state = PROMISE_STATE.FULFILLED;

        // 当resolve执行时，说明数据已经存入，需要调用then的回调函数
        this.#callback && this.#callback(this.#value);
    }

    #reject(value) {

    }

    then(onFulfilled, onRejected) {
        if (this.#state === PROMISE_STATE.PENDING) {
            // 若数据还未存入Promise，则将回调函数设置为callback的值
            this.#callback = onFulfilled;
        }
        else if (this.#state === PROMISE_STATE.FULFILLED) {
            onFulfilled(this.#value);
        }
    }
}

const mp = new MyPromise((resolve, reject) => {
    console.log("回调函数调用了");
    setTimeout(() => {
        resolve("异步存入的数据");
    }, 1000);
    // resolve("同步存入的数据");
});

mp.then(result => {
    console.log(result);
});

