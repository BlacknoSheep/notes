# 一、基本命令

1. 通过 `tsc` 命令将 ts 文件编译为 js 文件

2. 通过 `tsc --init` 创建配置文件

# 二、从 js 到 ts

## 1. 定义变量时需要声明类型。

```typescript
let num1: number = 1;
let str1: string = "abcd";

// 先声明后赋值
let num2: number;
num2 = 2;

// void 类型在严格模式下只能赋值为 undefined，在非严格模式下还可以赋值为 null
let void1: void = undefined;

// 严格模式下 undefined 类型只能赋值为 undefined，null 类型只能赋值为 null
// 非严格模式下二者可以相互赋值
let a: undefined = undefined;
let b: null = null;
```

## 2.  ts 的基本变量类型

```typescript
// 1. any unknown  <-- 顶级类型
// 2. Object	<-- 注意是大写
// 3. Number String Boolean
// 4. number string boolean
// 5. 1 "abc" true
// 6. never
```

低级类型可以赋值给高级类型。

any 和 unknown 的区别：

- any 可以赋值给任何类型，而 unknown 只能赋值给 any 类型或 unknown 类型。

- unknown 类型无法访问其属性或方法，any 可以（没有提示和检查）。
- 所以 unknown 类型更加安全

## 3. 对象类型

- Object 可以被除 unknown 以外的任何类型赋值。
- object 只能被引用类型（对象、数组等）赋值。
- {} 相当于 `new Object`，特性同 Object。

```typescript
let obj1: object = 1; // Error，不能被原始类型赋值
let obj1: object = "abc"; // Error，不能被原始类型赋值

let obj2: object = []; // 只能被引用类型赋值
let obj3: object = {}; // 只能被引用类型赋值
```

这三种对象类型的属性和方法是无法访问的。

```typescript
let obj1: Object = { name: "Jack" };
let obj2: object = {
  getName() {
    return "obj2";
  },
};
obj1.name = "Tom"; // Error
obj2.getName(); // Error
```

## 4. 接口（interface）

可以通过 interface （接口）声明对象的内部结构。

```typescript
interface Person {
  name: string;
  age: number;
  showInfo: () => void;
}

const p1: Person = {
  name: "Mark",
  age: 39,
  showInfo: function () {
    console.log(`${this.name} ${this.age}`);
  },
};
```

同名 interface 会合并。

```typescript
interface Person {
  name: string;
  age: number;
}
interface Person {
  address: string;
}

// 等价于
interface Person {
  name: string;
  age: number;
  address: string;
}
```

**索引签名：**interface 的内部属性名可以是动态的。

```typescript
interface Person {
  name: string;
  age: number;
  [index: string]: any; // 索引签名，index 本身也具有类型
}

const person: Person = {
  // 前两个属性必须有
  name: "Todd",
  age: 27,
  
  // 后面的属性可以有 0 个或多个
  num: 123,
  job: "TypeScript",
};
```

索引签名属性的类型会限制 interface 里的所有属性的类型。

```typescript
interface Person {
  name: string;
  1: string;
  2: number; // Error
  [index: number]: string; // number 类型的索引，值只能为 string 类型
}
```

**可选属性**

```typescript
interface Person {
  name: string;
  age?: number; // 可有可没有
}

const person: Person = {
  name: "John",
};
```

**只读属性**

```typescript
interface Person {
  readonly id: number;
  name: string;
}

const person: Person = {
  id: 1,
  name: "John",
};

person.id = 1; // Error
```

**interface 继承**

```typescript
interface Animal {
  name: string;
}
interface Person extends Animal { // 继承 Animal 中定义的内容。 extends A,B 继承多个
  age: number;
}

const person: Person = {
  name: "John",
  age: 30,
};
```

## 5. 数组类型

```typescript
let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
let arr3: number[][] = [[1, 2, 3], [4, 5, 6]];
let arr4: Array<Array<number>> = [[1, 2, 3], [4, 5, 6]];
let arr5: [number, string] = [1, "sss"];

function fn(...args: any[]) { // 接收任意数量参数的 args 是数组形式
  let a: IArguments = arguments; // 类数组，IArguments 为 ts 内置类型
  console.log(args);
}
```

## 6. 函数的写法和类型

```typescript
function getInfo(name: string, age: number = 0): string {
  return `${name}今年${age}岁了`;
}
```

可以定义函数的 this 的类型，此时 this 必须作为第一个参数。在使用时不需要传入 this 参数。

```typescript
interface Students {
  stuList: string[];
  addStudent(this: Students, student: string): void;
}

let students: Students = {
  stuList: ["A", "B"],
  addStudent(this: Students, student: string): void {
    this.stuList.push(student);
  },
};

students.addStudent("C");
```

**函数重载**

```typescript
let users: string[] = ["A", "B", "C"];

function getUser(): string[];
function getUser(id: number): string;
function getUser(ids: number[]): string[];
// 上面几行用于解决ts爆红，下面的函数实现真正的逻辑
function getUser(idOrIds?: number | number[]): string | string[] {
  if (typeof idOrIds === "number") {
    return users[idOrIds];
  } else if (Array.isArray(idOrIds)) {
    return idOrIds.map((id) => users[id]);
  } else {
    return users;
  }
}
```

## 7. 联合类型

```typescript
let hour: number | string = 10;
hour = "10";
```

## 8. 交叉类型

```typescript
interface Human {
  name: string;
}
interface God {
  age: number;
}

let a: Human & God = {
  name: "a",
  age: 10000,
};
```

## 9. 类型断言

通过 `as` 强制断言为某种类型，谨慎使用！

```typescript
let arr: number[] = [1, 2, 3];
let num = arr.find((item) => item > 2);
console.log(num * 5); // Error，num 可能为 undefined
console.log((num as number) * 5); // OK，num 为 number 类型（即使实际上 num 可能为 undefined）
```

## 10. 内置类型 & DOM 对象 & BOM

内置对象

```javascript
let num: Number = new Number(7);
let date: Date = new Date();
let xhr: XMLHttpRequest = new XMLHttpRequest();
```

DOM 对象

```typescript
let div: HTMLElement = document.createElement("div");
let div2 = document.createElement("div") as Element;
let input: HTMLInputElement = document.createElement("input");
let divs: NodeList = document.querySelectorAll("div");
let lis: NodeListOf<HTMLLIElement | HTMLInputElement> = document.querySelectorAll("div, li");
```

BOM

```typescript
let local: Storage = localStorage;
local.setItem("name", "John");

let lo: Location = location;
console.log(lo.href);

let promise: Promise<string> = new Promise((resolve, reject) => {
  resolve("Hello");
});
promise.then((value) => console.log(value));

let cookie: string = document.cookie;
console.log(cookie);
```

## 11. 类

通过 `implements` 限制类必须满足某个 interface 结构。

```typescript
interface PersonCls {
  name: string;
  show(): void;
}

class Person implements PersonCls {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  show() {
    console.log(this.name);
  }
}
```

## 12. 元组类型

```typescript
let arr: [number, string] = [1, "a"];
let arr2: readonly [number, string] = [2, "b"];
arr[0] = 11;
arr2[0] = 22; // error

let arr3: [number, string, age?: number] = [1, "a"]; // 第三个属性是可选的
```

## 13. 枚举类型

```typescript
// 数值枚举
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}

enum Color2 {
  Black = 1,
  White, // 2
}

// 字符串枚举
enum Color {
  Red = "red",
  Green = "green",
}

// 异构枚举
enum Color {
  Red = 2,
  Green = "green",
}
```

**常量枚举：**枚举量在编译器会被替换为对应的字面量值

```typescript
// 常量枚举
const enum YorN {
  Yes,
  No,
}

console.log(Color); // Error，常量枚举在编译期被删除，无法访问
```

**数值枚举是双向映射**

```typescript
enum Color {
  Black,
  White,
}
```

会被编译为：

```javascript
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["White"] = 1] = "White";
})(Color || (Color = {}));
```

- 可以看出是双向映射

  ```typescript
  console.log(Color.Black, Color[0], Color["Black"]); // 0 Black 0
  ```

而字符串枚举不具有这个特性

```typescript
enum Color {
  Black = "000",
  White = "FFF",
}

// 被编译为：
var Color;
(function (Color) {
    Color["Black"] = "000";
    Color["White"] = "FFF";
})(Color || (Color = {}));
```

## 14. never 类型

用于表示永远不会存在的值。

```typescript
type myType = string & number; // 推断为 never

// 抛出异常
function errorHandle(): never {
  throw new Error("Error");
}

// 死循环，不可能返回。
function loop(): never {
  while (true) {}
}
```

或者用于兜底逻辑。

```typescript
type sports = "swim" | "run";
function say(sport: sports) {
  switch (sport) {
    case "swim":
      break;
    case "run":
      break;
    default:
      // 正常情况下永远不会到达这里
      // 但是如果对 sports 进行了修改（增添类型），此处会报错，用来提示需要处理。
      const error: never = sport;
      break;
  }
}
```

## 15. 类型别名

```typescript
type snb = string | number | boolean;
let val: snb = 12;
val = true;
val = "hello";
```

和 interface 的区别：

- type 可以声明任何类型的别名（包括字面值、联合类型）。interface 用于声明对象的结构，声明的是对象的属性的类型。
- 同名 interface 会合并。而别名是不允许重复的。
- interface 可以通过 extends 继承 interface 或 type 。type 只能通过交叉类型（&）实现类似继承的效果。

## 16. extends

[extends 的用法](https://blog.csdn.net/qq_34998786/article/details/120300361)

1. 用于类或 interface 继承

2. 用于泛型约束

3. 用于条件类型与高级类型

## 17. 泛型

```typescript
// 可以用于函数
function combine<T>(a: T, b: T) {
  return [a, b];
}
console.log(combine(1, 2)); // [1, 2]
console.log(combine<string>("a", "b")); // ["a", "b"]

// 可以用于 type 和 interface
type A<T> = string | T;
let a: A<number> = 1;

interface B<T> {
  a: T;
  b: number;
}
let b: B<string> = {
  a: "a",
  b: 1,
};

// 可以有多个泛型
interface A<T, K> {
  a: T;
  b: K;
}

// 可以设置泛型的默认类型（同样有默认值的要放在后面）
interface A<T, K = number> {
  a: T;
  b: K;
}
```

## 18. 泛型约束

默认情况下，泛型 T 可以代表多个类型，这会导致**无法访问 T 类型变量的任何属性**。

```typescript
function cmp<T>(a: T, b: T) {
  return a.length > b.length; // error
}

function add<T>(a: T, b: T) {
  return a + b; // error	T 可能为 undefined
}
```

```typescript
interface Len {
  length: number;
}
// 约束 T 必须具有 length 属性（T 类型可以赋值给 Len 类型）
function cmp<T extends Len>(a: T, b: T) {
  return a.length > b.length;
}

// 约束 T 只能为 number 的子集（T 类型可以赋值给 number 类型）
function add<T extends number>(a: T, b: T) {
  return a + b;
}
```

**`keyof` 操作符**

将一个对象类型的所有属性名作为联合类型返回。

```typescript
interface Obj {
  a: number;
  b: string;
}
type ObjKey = keyof Obj; // "a" | "b"

type Obj2 = {
  c: boolean;
  d: number;
};
type Obj2Key = keyof Obj2; // "c" | "d"
```

若对象类型的属性名为索引类型，则会返回该索引的类型。

```typescript
interface Obj {
  [key: number]: number;
}
type Key = keyof Obj; // number

interface Obj2 {
  [key: string]: number;
}
type Key2 = keyof Obj2; // string | number （js 中 number 在作为 key 时总是会被转为 string）
```

```typescript
function getVal<T, K>(obj: T, key: K) {
  return obj[key]; // error，K 类型不一定能作为 T 类型对象的索引。
}

function getVal<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
```

`keyof` 的高级用法

```typescript
interface Person {
  name: string;
  age: number;
}

type Person2<T extends object> = {
  [Key in keyof T]?: T[Key];
};

type T1 = Person2<Person>;

// T1 表示类型：
// type T1 = {
//     name?: string | undefined;
//     age?: number | undefined;
// }
```

## 19. 仅导入声明

```typescript
import type { foo } from "xxx";

export type { foo };
```



# 三、补充内容

## 1. Symbol 类型

是 es6 引入的一种新的数据类型。

**唯一性：**每个创建的 symbol 都是唯一的。

```typescript
let s1: Symbol = Symbol();
let s2: Symbol = Symbol();
console.log(s1 == s2); // false
console.log(s1 === s2); // false
```

可以在定义时传入一个可选的描述符参数，描述符只能用于调试，对其本身没有任何影响。

```typescript
let s1: Symbol = Symbol(1);
let s2: Symbol = Symbol(1);
console.log(s1 == s2); // false
console.log(s1 === s2); // false
```

**`Symbol.for(key)`**

若**全局 symbol 注册表**中存在键为 `key` 的 symbol ，则返回该 symbol ；若不存在，则会新建并放入**全局 symbol 注册表**中。

注意：`Symbol()` 创建的 symbol 不会被放入全局 symbol 注册表中。

```typescript
// 左式新建 key 为 "a" 的 symbol ，右式返回该 symbol
console.log(Symbol.for("a") === Symbol.for("a")); // true
```

**`Symbol.keyFor()`**

获取全局 symbol 注册表中与某个 symbol 对应的键。

```typescript
let s1 = Symbol.for("s1");
console.log(Symbol.keyFor(s1)); // s1
```

**symbol 作为属性名**

```typescript
let s1 = Symbol("s");
let s2 = Symbol("s");
const obj = {
  name: "obj",
  [s1]: "s1",
  [s2]: "s2",
};

for (let key in obj) {
  console.log(key); // name
}
console.log(Object.keys(obj)); // [ 'name' ]
console.log(Object.getOwnPropertyNames(obj)); // [ 'name' ]
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(s), Symbol(s) ]
console.log(Reflect.ownKeys(obj)); // [ 'name', Symbol(s), Symbol(s) ]
```

## 2. 生成器

每次调用生成器，运行到下一个 `yield`

```typescript
// 生成器函数，返回一个生成器对象
function* gen() {
  console.log("第一次调用");
  yield 1;
  console.log("第二次调用");
  yield "a";
  console.log("第三次调用");
  yield 3;
  console.log("第四次调用");
}
const g = gen(); // 生成器对象
console.log(g.next()); // 第一次调用 { value: 1, done: false }
console.log(g.next()); // 第二次调用 { value: 'a', done: false }
console.log(g.next()); // 第三次调用 { value: 3, done: false }
console.log(g.next()); // 第四次调用 { value: undefined, done: true }
```

## 3. 迭代器

迭代器（iterator）是一种接口，用于为不同的数据结构提供统一的遍历机制。

- `String`、`Array`、`Map`、`Set` 等数据结构均提供了迭代器接口。

```typescript
const arr: Array<number> = [1, 2];
for (let num of arr) {
  console.log(num);
}

let it = arr[Symbol.iterator](); // 返回一个迭代器对象
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: undefined, done: true }
```

```typescript
const arr: Array<number> = [1, 2];
const st: Set<number> = new Set([1, 2]);

function each(st: any) {
  let it: any = st[Symbol.iterator]();
  let res: any = it.next();
  while (!res.done) {
    console.log(res.value);
    res = it.next();
  }
}

each(arr); // 1 2
each(st); // 1 2
```

- 可以通过 `for...of...` 语法糖遍历具有迭代器接口的数据结构。

```typescript
for (let num of arr) {
  console.log(num);
}
```

注意：不能对对象使用 `for...of...`

解构的底层原理也是迭代器。

```typescript
let [a, b, c] = [1, 2, 3];
let arr = [1, 2, 3];
let arr2 = [...arr];
```

- 可以手动为对象实现迭代器接口

```typescript
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

let arr = [...nums];
console.log(arr); // [0, 1, 2]
```

## 4. 命名空间

TypeScript 与 ECMAScript 2015一样，任何包含**顶级 import** 或者 **export** 的文件都被当成一个模块。相反地，如果一个文件不带有顶级的 import 或者 export 声明，那么它的内容被视为全局可见的（可见但不可用），会造成全局变量污染。

可通过命名空间（namespace）来解决名称冲突。

```typescript
// 只有通过 export 导出的变量和函数可以在外部访问。
namespace A {
  export let value = 1;
  export function fn() {
    console.log(value);
  }
}

A.value = 2;
A.fn();
```

命名空间可以嵌套：

```typescript
namespace B {
  export namespace C {
    export namespace D {
      export const val = 1;
    }
  }
}
console.log(B.C.D.val);
```

将命名空间抽离为一个文件。

```typescript
// test.ts
export namespace A {
  export let val = 1;
}

// index.ts
import { A } from "./test";
console.log(A.val); // 1
```

可以用 `import` 为导入的命名空间定义别名。

```typescript
// test.ts
export namespace A {
  export namespace B {
    export let val = 1;
  }
}

// index.ts
import { A } from "./test";
import AB = A.B;
console.log(AB.val); // 1
```

同名命名空间会合并。

```typescript
export namespace A {
  export let val1 = 1;
}

export namespace A {
  export let val2 = 2;
}

console.log(A.val1, A.val2); // 1 2
```



