<template>
  <div>
    <span>A组件 -- {{ count }} -- </span>
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
// const count = ref(0);
// function increment() {
//   count.value++;
// }
const { count, increment } = inject("rootProvide");
</script>
