# 一、Vue3

参考资料
    [Vue3 @小满 csdn](https://xiaoman.blog.csdn.net/category_11618172_2.html)
    [Vue3 源码分析](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxMDczMTE2OQ==&action=getalbum&album_id=2139738412545835009&nolastread=1#wechat_redirect)

1. `defineOptions()`

   这个宏可以用来直接在 `<script setup>` 中声明组件选项，而不必使用单独的 `<script>` 块

   ```vue
   <script setup>
   defineOptions({
     inheritAttrs: false,
     customOptions: {
       /* ... */
     }
   })
   </script>
   ```

   


# 二、虚拟 DOM 和 Diff 算法

参考资料
    [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
    [patchUnkeyedChildren](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts#L1693)
    [patchKeyedChildren](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts#L1753)

虚拟DOM：用 js 对象描述 DOM 的层次结构
```javascript
var element = {
  tagName: 'ul', // 节点标签名
  props: { // DOM的属性，用一个对象存储键值对
    id: 'list'
  },
  children: [ // 该节点的子节点
    {tagName: 'li', props: {class: 'item'}, children: ["Item 1"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 2"]},
    {tagName: 'li', props: {class: 'item'}, children: ["Item 3"]},
  ]
}
```
对应的 html 代码
```html
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```

# 三、响应式

## 1. `ref`、`isRef`、`shallowRef`、`triggerRef`

   `ref`支持所有类型

   ```javascript
   import { ref, isRef, shallowRef, triggerRef } from 'vue';
   const text1 = ref({ name: "text1" }); // 深层响应式对象
   console.log(isRef(text1)); // true
   
   const text2 = shallowRef({ name: "text2" }); // 浅层响应式对象
   console.log(isRef(text2)); // true
   
   text2.value.name = "text2-1"; // 浅层响应式对象的属性发生变化，不会触发更新
   triggerRef(text2); // 强制触发浅层响应式对象的副作用（发生更新）
   ```

## 2. `reactive`、`readonly`、`shallowReactive`

   `reactive`只支持引用类型（Array, Object, Map, Set, ...）

   ```javascript
   import { reactive, readonly } from "vue";
   const obj = reactive({ name: "Tom" });
   const readonlyObj = readonly(obj);
   readonlyObj.name = "Jerry"; // Error，只读属性无法赋值
   
   const obj2 = shallowReactive({ goods: { name: "apple" } }); // 浅层响应式对象
   ```

## 3. 注意：**深层响应式对象更新时，会触发页面的重新渲染，此时浅层响应式对象的属性也会同步到页面上**

## 4. `toRef`、`toRefs`、`toRaw`

   [toRef、toRefs](https://cn.vuejs.org/api/reactivity-utilities.html#toref)
   [toRaw](https://cn.vuejs.org/api/reactivity-advanced.html#toraw)

   ```javascript
   import { reactive, toRef, toRefs, toRaw } from "vue";
   const state = reactive({
     foo: 1,
     bar: 2,
   });
   
   // 双向 ref，会与源属性同步
   const fooRef = toRef(state, "foo");
   
   // 更改该 ref 会更新源属性
   fooRef.value++;
   console.log(state.foo); // 2
   
   // 更改源属性也会更新该 ref
   state.foo++;
   console.log(fooRef.value); // 3
   ```

   ```javascript
   const map = toRefs(state);
   console.log(map); // 普通对象，包含两个响应式属性
   console.log(map.foo, map.bar); // 两个 ref 对象，均与state的属性双向绑定
   console.log(map.foo.value, map.bar.value); // 1 2
   ```

   ```javascript
   const rawState = toRaw(state);
   console.log(rawState);  // 普通对象
   ```

## 5. 计算属性

   ```javascript
   import { computed, reactive } from "vue";
   const p1 = reactive({ name: "p1", age: 18 });
   
   // 选项式写法
   const info = computed({
     get() {
       return p1.name + "-" + p1.age;
     },
     set(val) {
       [p1.name, p1.age] = val.split("-");
     },
   });
   info.value = "p2-20"; // 修改成功
   
   // 函数式写法，只有 getter() 函数，只允许读取，不允许修改
   const info2 = computed(() => {
     return p1.name + "-" + p1.age;
   });
   info2.value = "p2-20"; // 报错
   ```


## 6. `watch`侦听器

   ```javascript
   const stop = watch(
     source, // 侦听源（返回一个值的函数，ref，响应式对象，或由以上值组成的数组）
     (newVal, oldVal) => { // 侦听源发生变化时调用的回调函数
       console.log(newVal, oldVal);
     },
     { // 配置对象
       immediate: true, // 创建侦听器时立即执行一次，oldVal=undefined。默认false
       deep: true, // 深层侦听，默认false
       flush: "pre", // pre 组件更新前调用，sync 同步执行，post 组件更新后调用，默认 pre
     }
   );
   
   stop(); // 停止侦听
   ```

   注意1：侦听`reactive`创建的对象时，deep 始终为 true（无论是否设置）

   `watchEffect`

   ```javascript
   // 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。
   const msg1 = ref("msg1");
   const stop = watchEffect(
     () => {  // 创建侦听器时会调用一次
       console.log(msg1.value);  // 依赖 msg1，msg1发生变化时调用此回调函数
     },
     {
       immediate: true, // 创建侦听器时立即执行一次，oldVal=undefined。默认false
       deep: true, // 深层侦听，默认false
       flush: "pre", // pre 组件更新前调用，sync 同步执行，post 组件更新后调用，默认 pre
     }
   );
   
   stop(); // 停止侦听
   ```

# 四、组件

## 1. [组件的生命周期](https://xiaoman.blog.csdn.net/article/details/122811060)

<img src="./images/组件的生命周期.png"></img>

## 2. 父子组件传参 `Props`

   **任何类型**的值都可以作为props的值被传递

   ```vue
   <!-- 父组件 -->
   <template>
     <A :name="name" :age="17" :address="`bilibili`"></A>
   </template>
   
   <script setup>
   import A from "./components/A.vue";
   const name = "Taffy";
   </script>
   ```

   ```vue
   <template>
     <!-- 子组件 -->
     <div>{{ props.name }} -- {{ props.age }} -- {{ props.address }}</div>
   </template>
   
   <script setup>
   // 需要定义一个参数来接收 props
   // const props = defineProps(["name", "age", "address"]);  // 数组形式
   // 对象形式
   const props = defineProps({
     name: String,
     age: {
       type: Number,
       default: 0, // 默认值
     },
     address: String,
   });
   </script>
   ```

## 3. 自定义事件 `emit`

   父组件传递回调函数给子组件

   ```html
   <!-- 父组件 --><!-- 父组件 -->
   <A @show-msg="(msg) => console.log(msg)"></A>
   
   <!-- 子组件A -->
   <button @click="$emit(`show-msg`, `Hello!`)">按钮</button>
   ```

   声明要触发的事件

   ```javascript
   const emit = defineEmits(["show-msg"]);
   function handleClick() {
     emit("show-msg", "Hello!");
   }
   ```

   可以通过这种方法从子组件向父组件传参

## 4. `defineExpose()` 向父组件暴露属性或方法

   `<script setup>`中默认关闭暴露，可以通过`defineExpose()`指定要暴露的属性。

   暴露的属性可以通过模板引用进行访问

   ```vue
   <!-- 父组件 -->
   <template>
     <A ref="child"></A>
   </template>
   
   <script setup>
   import { onMounted, ref } from "vue";
   import A from "./components/A.vue";
   const child = ref(null);
   onMounted(() => {
     // 组件渲染完成后，才能获取子组件实例的属性
     console.log(child.value);
   });
   </script>
   ```

   ```vue
   <!-- 子组件 -->
   <script setup>
   const name = "A";
   defineExpose({
     name,
   });
   </script>
   ```

## 5. 注册全局组件

   ``` javascript
   // main.js
   import { createApp } from "vue";
   import App from "./App.vue";
   import GlobalVue from "./components/GlobalVue.vue";
   const app = createApp(App);
   app.component("GlobalVue", GlobalVue); // 注册全局组件
   app.mount("#app");
   ```

## 6. 递归组件

一个**单文件组件**可以通过它的文件名被其自己所引用。

```vue
<!-- Tree.vue -->
<template>
  <div class="warpper">
    <span>A组件</span>
    <Tree v-if="count > 0" :count="count - 1"></Tree>
  </div>
</template>

<script setup>
const props = defineProps(["count"]);
</script>

<style scoped>
.warpper {
  margin-left: 10px;
}
</style>
```

