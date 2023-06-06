<script setup>
import { reactive, ref, computed } from "vue";

/*
  reactive()
    - 返回一个对象的响应式代理
    - 返回的是一个深层响应式对象
    - 可以使用shallowReactive()创建一个浅层响应式对象
    - 缺点：只能生成对象的代理，不能生成原始值的代理

  ref()
    - 接受一个任意值，返回其响应式代理
    - 原理：将接受的值包装为一个对象，然后再生成其响应式对象  0 --> {value:0}
*/

const stu = reactive({
  name: "Taffy",
  age: 17,
  gender: "女",
});

function changeAge() {
  ++stu.age;
}

const msg = ref("Hello World");
console.log(msg.value);

const obj = {
  name: ref("孙悟空"),
  age: ref(50),
};

// computed 用来生成计算属性
const newMsg = computed(() => {
  return msg.value + "!!!";
});
</script>

<template>
  <!--
    ref()包装后的对象会自动解包，不需要也不能使用 .value
      - 只有包装后的对象位于顶层才会自动解包：msg.value --》 msg
      - 如果包装后的对象位于嵌套结构中，则必须手动解包：obj.name.value
  -->
  <h1>{{ msg }}</h1>
  <h1>{{ obj.name.value }}</h1>
  <hr />
  <h2>{{ stu.name }} -- {{ stu.age }} -- {{ stu.gender }}</h2>
  <button @click="changeAge()">+1</button>
  <hr />
  <h1>{{ newMsg }}</h1>
</template>
