async function fn1() {
    console.log(1);
    console.log(2);
    console.log(3);
}
// fn1();
// console.log(4);
// 输出：1 2 3 4


/*
    使用await调用函数后，当前函数后面的所有代码
        会在当前函数执行完毕后，被放入微任务队列中
*/
async function fn2() {
    console.log(1);
    await console.log(2);
    // await后的代码会被放入微任务队列中
    console.log(3);
}
// fn2();
// console.log(4);
// 输出：1 2 4 3

function fn3() {
    return new Promise(resolve => {
        console.log(1);
        console.log(2);
        resolve();
    }).then(r => {
        console.log(3);
    });
}
fn3();
console.log(4);
// 相当于fn2
// 输出：1 2 4 3


