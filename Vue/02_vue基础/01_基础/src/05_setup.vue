<script setup>
import { reactive } from "vue";

const stu = reactive({
  name: "Taffy",
  age: 17,
  gender: "女",
});

function changeAge() {
  ++stu.age;
}
</script>

<template>
  <!-- <h1>{{ msg }}</h1>
  <h2>{{ count }}</h2>
  <button @click="++count">+1</button>
  <hr /> -->
  <h2>{{ stu.name }} -- {{ stu.age }} -- {{ stu.gender }}</h2>
  <button @click="changeAge()">+1</button>
</template>
