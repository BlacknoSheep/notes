<template>
  {{ studentStore }}
  <div>{{ studentStore.name }} -- {{ studentStore.age }}</div>
  <div>{{ name }} -- {{ age }}</div>
  <div>{{ nameRef }} -- {{ ageRef }}</div>
  <div>{{ hello }}</div>
  <div>
    <button @click="studentStore.growUp">+1</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useStudentStore } from "./store/studentStore";
const studentStore = useStudentStore();
console.log(studentStore);
/*
  store 实例本身就是一个reactive对象，可以通过它直接访问state中的数据
  但是，如果直接将state中的数据解构出来，那么数据会丧失响应性

  可以通过storeToRefs方法进行解构：
    它可以将state和getters中的属性结构为ref，保留响应式
    注意：无法结构action中的方法
*/
const { name, age } = studentStore; // name和age不是响应式的
// 保留响应式
const { name: nameRef, age: ageRef, hello, growUp } = storeToRefs(studentStore);
console.log(growUp); // undefined
</script>

<style scoped></style>
