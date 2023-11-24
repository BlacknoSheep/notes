# 一、基本概念

## 1. var、let、const

- let 和 const 是 es6 新增的。

- var 是函数级作用域，let/const是块级作用域。

- var 存在变量提升，通过var声明变量时，该声明会被提升到其作用域顶部。（注意：仅提升声明，在运行到初始化语句前值为undefined）。

  let/const 一般会说不存在变量提升。但实际上也会提升，只是在运行到初始化语句前禁止访问（即会产生暂时性死区）。

- var 声明的变量会被挂载到全局 window 上，let/const 声明的变量不会。

## 2. 函数

- 会发生提升，所以可以将函数调用写在函数定义前。

## 3. class

- 本质上是函数。

## 4. window

- 向 window 中添加的变量会自动成为全局变量。
- 全局作用域中，var 声明的变量、function声明的函数都会挂载在window上。

## 5. 浅拷贝和深拷贝

数组的拷贝

```javascript
let a = [{ name: "a" }, { name: "b" }];

let a_shallow = a.slice();
let a_shallow2 = [...a];
let a_shallow3 = a.concat();

let a_deep = structuredClone(a);
let a_deep2 = JSON.parse(JSON.stringify(a));
```

对象的拷贝

```javascript
let obj = {
  name: "A",
  child: {
    name: "B",
  },
};

let obj_shallow = Object.assign({}, obj);
let obj_shallow2 = { ...obj };

let obj_deep = JSON.parse(JSON.stringify(obj));
let obj_deep2 = structuredClone(obj);
```

## 6. BOM

BOM（Browser Object Model）

- 浏览器对象模型
- BOM 提供了一组对象，通过这组对象可以完成对浏览器的各种操作
  - window —— 代表浏览器窗口（全局对象）
  - navigator —— 浏览器的对象（可以用来识别浏览器（chrome,firefox等））
  - location —— 浏览器的地址栏信息
  - history —— 浏览器的历史记录（控制浏览器前进后退）
  - screen —— 屏幕的信息
- BOM 对象都是作为window对象的属性保存的，所以可以直接在JS中访问这些对象

# 二、代码执行结果

## 1. typeof

js中的类型：

- `undefined`：未定义的变量或值
- `boolean`
- `string`
- `number`
- `object`
- `function`
- `symbol`

`typeof` 语句的返回值是一个字符串

```javascript
typeof typeof 1; // string
typeof NaN; // number
typeof undefined; // undefined
typeof null; // object
typeof (() => {}); // function
typeof function () {}; // function
typeof []; // object
```

为初始化的变量的类型为`undefined`

```javascript
let a;
typeof a; // undefined
```

js中没有严格的类，类本质上就是函数。

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.name);
  }
}
typeof Person; // function, 类本质上是函数
let p = new Person("zhangsan");
typeof p; // object
```

