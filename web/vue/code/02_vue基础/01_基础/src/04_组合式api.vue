<script>
import { reactive } from "vue";

export default {
  // 组合式api
  setup() {
    // 在组合式api中直接声明的变量为非响应式的
    const msg = "hello vue3";
    const count = 0;

    // 使用reactive函数将变量转换为响应式的
    const stu = reactive({
      name: "Taffy",
      age: 17,
      gender: "女",
    });

    function changeAge() {
      ++stu.age;
    }

    return {
      msg,
      count,
      stu,
      changeAge,
    };
  },
};
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>{{ count }}</h2>
  <button @click="++count">+1</button>
  <hr />
  <h2>{{ stu.name }} -- {{ stu.age }} -- {{ stu.gender }}</h2>
  <button @click="changeAge()">+1</button>
</template>
