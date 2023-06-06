<template>
  <div>
    <span>A组件 -- {{ countStore.count }} -- </span>
    <button @click="countStore.increment">+1</button>
  </div>
</template>

<script setup>
// 引入 store 钩子函数
import { useCountStore } from "../store/countStore.js";
const countStore = useCountStore();
</script>
