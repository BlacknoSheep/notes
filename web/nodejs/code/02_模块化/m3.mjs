/*
    ES 模块化
*/

/*
    向外部导出内容
*/
export let a = 10;
export const b = "BBB";
export const obj1 = { name: "永雏塔菲" };

/*
    设置默认导出
        default 后面必须是一个值（包括函数、对象）
        一个模块中只能有一个默认导出
*/
export default function fn1() {
    console.log("fun fn1");
}
