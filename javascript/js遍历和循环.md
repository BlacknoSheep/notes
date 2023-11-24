# 一、`for in` 

`for in` 用于遍历一个对象的除 `Symbol` 以外的**可枚举属性**，包括继承的可枚举属性。

`for in` 无法保证遍历顺序和书写顺序一致，所以不应该用于遍历需要保证有序的内容。

**可枚举属性：**指的是 `enumerable` 标志被设置为 `true` 的属性。

```javascript
const obj = {
  a: "AAA",
  1: "bbb",
  fn1() {
    console.log("fn1");
  },
  fn2: () => {
    console.log("fn2");
  },
  [Symbol("c")]: "CCC",
};

// 不可枚举的属性
Object.defineProperty(obj, "b", {
  value: "BBB",
  enumerable: false,
});

// 原型上的属性
Object.getPrototypeOf(obj).m = "MMM";

for (const key in obj) {
  console.log(key);
}
```

输出：

```
1
a
fn1
fn2
m
```

可以看到只会遍历对象本身的可枚举属性和其原型上的可枚举属性， `Symbol` 属性和不可枚举属性不会被遍历到。

**为什么 `for in` 能够遍历数组？**
因为 js 中数组实际上是对对象的封装。

```javascript
const arr = ["a", "b", "c"];
for (const idx in arr) {
  console.log(idx);
}
```

输出

```
1
2
3
```

**访问对象的属性的方法的对比：**https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties#%E7%BB%9F%E8%AE%A1%E8%A1%A8

# 二、`for of`

用于遍历可迭代对象（`Array`，`Map`，`Set` ，`String` 等）。

遍历结果由可迭代对象的迭代器决定。

对于数组，`for of` 会依序遍历其中的值（而 `for in` 是遍历索引）。

```javascript
const arr = ["a", "b", "c"];
for (const item of arr) {
  console.log(item);
}
```

输出

```
a
b
c
```

一般情况下，普通对象没有迭代器，无法使用 `for of` 进行遍历。可以通过为对象实现迭代器接口，来让其可以通过 `for of` 遍历。

```javascript
const nums = {
  min: 0,
  max: 3,
  [Symbol.iterator]() {
    return {
      current: this.min,
      max: this.max,
      next() {
        if (this.current < this.max) {
          return { value: this.current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};

for (let num of nums) {
  console.log(num); // 0 1 2
}
```

