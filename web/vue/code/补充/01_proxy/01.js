const obj = {
  name: "永雏塔菲",
  age: 17,
};

/*
  直接修改一个元素的属性不会触发重新渲染
*/
// obj.name = "Taffy";

// handler 用来指定代理的行为
const handler = {
  // get 用来指定读取数据时的行为，其返回值就是最终读取到的值
  get(target, prop, receiver) {
    /*
      target: 被代理的对象
      prop: 要读取的属性名
      receiver: 代理对象
    */
    // console.log(prop);
    return target[prop];
  },

  // set 用来指定修改数据时的行为，其返回值是一个布尔值，表示是否修改成功
  set(target, prop, value, receiver) {
    /*
      target: 被代理的对象
      prop: 要修改的属性名
      value: 修改的值
      receiver: 代理对象
    */
    target[prop] = value;
    return true;
  },
};

// 创建代理对象
const proxy = new Proxy(obj, handler);

console.log(proxy.name); // 永雏塔菲
proxy.age = 18;
console.log(obj.age); // 18
